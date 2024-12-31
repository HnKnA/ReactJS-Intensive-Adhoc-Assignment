import React, { useMemo } from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import styles from "../../assets/css/Form.module.css";
import {
  KycFormValues,
  Liability,
  LiabilityType,
} from "../../services/types/KycFormValues";
import FormErrorMessage from "./FormErrorMessage";

interface LiabilitiesPanelProps {
  formik: FormikProps<KycFormValues>;
  userEditInfo: KycFormValues | undefined;
  isOfficer: boolean;
}

function LiabilitiesPanel({
  formik,
  userEditInfo,
  isOfficer,
}: LiabilitiesPanelProps) {
  const { getFieldProps, setFieldValue } = formik;

  const liabilities = isOfficer
    ? userEditInfo?.kycInfo?.liabilities || []
    : formik.values.kycInfo?.liabilities || [];

  const touchedLiabilities = formik.touched?.kycInfo?.liabilities || [];
  const errorsLiabilities = formik.errors?.kycInfo?.liabilities || [];

  // Calculate total liabilities
  const totalLiabilities = useMemo(
    () =>
      liabilities.reduce(
        (sum, { liabilityAmount }) => sum + (liabilityAmount || 0),
        0
      ),
    [liabilities]
  );

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Liabilities (C)
      </h3>
      <p className="text-sm mb-4 text-gray-600">
        Liabilities are any outstanding debts or obligations you may have. These
        can include loans such as personal loans, mortgages, or other forms of
        debt.
      </p>
      {liabilities.map((liability, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">Liability {index + 1}</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Liability Type */}
            <div>
              <label
                htmlFor={`kycInfo.liabilities[${index}].liabilityType`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`kycInfo.liabilities[${index}].liabilityType`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(
                  `kycInfo.liabilities[${index}].liabilityType`
                )}
                value={
                  isOfficer
                    ? liabilities[index]?.liabilityType ||
                      LiabilityType.PersonalLoan
                    : liabilities[index]?.liabilityType
                }
                disabled={isOfficer}
              >
                <option value="personal-loan">Personal Loan</option>
                <option value="real-estate-loan">Real Estate Loan</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Liability Amount */}
            <div>
              <label
                htmlFor={`kycInfo.liabilities[${index}].liabilityAmount`}
                className="block text-sm font-medium"
              >
                Amount (Currency)
              </label>
              <input
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                id={`kycInfo.liabilities[${index}].liabilityAmount`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter amount"
                readOnly={isOfficer}
                {...getFieldProps(
                  `kycInfo.liabilities[${index}].liabilityAmount`
                )}
                value={
                  isOfficer
                    ? liabilities[index]?.liabilityAmount || 0
                    : liabilities[index]?.liabilityAmount || ""
                }
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsLiabilities[index] as FormikErrors<Liability>)
                      ?.liabilityAmount
                  }
                  touched={touchedLiabilities[index]?.liabilityAmount}
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
                const updatedLiabilities = liabilities.filter(
                  (_, i) => i !== index
                );
                setFieldValue("kycInfo.liabilities", updatedLiabilities);
              }}
            >
              Delete Liability
            </button>
          )}
        </div>
      ))}

      {/* Total Liabilities */}
      <div className="mt-4">
        <label
          htmlFor="liabilities-total"
          className="block text-sm font-medium"
        >
          Total Liabilities
        </label>
        <input
          type="number"
          id="liabilities-total"
          className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
          placeholder="Calculated Total"
          readOnly
          value={totalLiabilities}
        />
      </div>

      {/* Add Liability Button */}
      {!isOfficer && (
        <button
          type="button"
          className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
          onClick={() => {
            const newLiability: Liability = {
              liabilityType: LiabilityType.PersonalLoan,
              liabilityAmount: null,
            };
            setFieldValue("kycInfo.liabilities", [
              ...liabilities,
              newLiability,
            ]);
          }}
        >
          Add Liability
        </button>
      )}
    </div>
  );
}

export default LiabilitiesPanel;
