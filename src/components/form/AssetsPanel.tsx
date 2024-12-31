import React from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import styles from "../../assets/css/Form.module.css";
import {
  KycFormValues,
  Asset,
  AssetType,
} from "../../services/types/KycFormValues";
import FormErrorMessage from "./FormErrorMessage";

interface AssetsPanelProps {
  formik: FormikProps<KycFormValues>;
  userEditInfo: KycFormValues | undefined;
  isOfficer: boolean;
}

function AssetsPanel({ formik, userEditInfo, isOfficer }: AssetsPanelProps) {
  const { getFieldProps, setFieldValue } = formik;

  const assets = formik.values.kycInfo?.assets || [];
  const userAssets = userEditInfo?.kycInfo?.assets || [];
  const touchedAssets = formik.touched?.kycInfo?.assets || [];
  const errorsAssets = formik.errors?.kycInfo?.assets || [];

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Assets (B)
      </h3>
      {assets.map((asset, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">Asset {index + 1}</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Asset Type */}
            <div>
              <label
                htmlFor={`kycInfo.assets[${index}].assetType`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`kycInfo.assets[${index}].assetType`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(`kycInfo.assets[${index}].assetType`)}
                value={
                  isOfficer
                    ? userAssets[index]?.assetType || AssetType.Bond
                    : assets[index]?.assetType
                }
                disabled={isOfficer}
              >
                <option value="bond">Bond</option>
                <option value="liquidity">Liquidity</option>
                <option value="real-estate">Real Estate</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Asset Amount */}
            <div>
              <label
                htmlFor={`kycInfo.assets[${index}].assetAmount`}
                className="block text-sm font-medium"
              >
                Amount (Currency)
              </label>
              <input
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                id={`kycInfo.assets[${index}].assetAmount`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter amount"
                readOnly={isOfficer}
                {...getFieldProps(`kycInfo.assets[${index}].assetAmount`)}
                value={
                  isOfficer
                    ? userAssets[index]?.assetAmount || 0
                    : assets[index]?.assetAmount || ""
                }
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsAssets[index] as FormikErrors<Asset>)?.assetAmount
                  }
                  touched={touchedAssets[index]?.assetAmount}
                />
              )}
            </div>
          </div>

          {/* Delete Button */}
          {index > 0 && !isOfficer && (
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm"
              onClick={() => {
                const updatedAssets = assets.filter((_, i) => i !== index);
                setFieldValue("kycInfo.assets", updatedAssets);
              }}
            >
              Delete Asset
            </button>
          )}
        </div>
      ))}

      {/* Add Asset Button */}
      {!isOfficer && (
        <button
          type="button"
          className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
          onClick={() => {
            const newAsset: Asset = {
              assetType: AssetType.Bond,
              assetAmount: null,
            };
            setFieldValue("kycInfo.assets", [...assets, newAsset]);
          }}
        >
          Add Asset
        </button>
      )}
    </div>
  );
}

export default AssetsPanel;
