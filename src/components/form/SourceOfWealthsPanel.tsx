import React, { useMemo } from "react";
import { FormikProps, FormikErrors } from "formik";
import styles from "../../assets/css/Form.module.css";
import {
  KycFormValues,
  SourceOfWealth,
  SourceOfWealthType,
} from "../../services/types/KycFormValues";
import FormErrorMessage from "./FormErrorMessage";

interface SourceOfWealthsPanelProps {
  formik: FormikProps<KycFormValues>;
  userEditInfo: KycFormValues | undefined;
  isOfficer: boolean;
}

function SourceOfWealthsPanel({
  formik,
  userEditInfo,
  isOfficer,
}: SourceOfWealthsPanelProps) {
  const { getFieldProps, setFieldValue } = formik;

  // Memoize sources of wealth to prevent unnecessary recalculations
  const sourcesOfWealth = useMemo(() => {
    return isOfficer
      ? userEditInfo?.kycInfo?.sourceOfWealth || []
      : formik.values.kycInfo?.sourceOfWealth || [];
  }, [isOfficer, userEditInfo, formik.values.kycInfo?.sourceOfWealth]);

  const touchedSourcesOfWealth = formik.touched?.kycInfo?.sourceOfWealth || [];
  const errorsSourcesOfWealth = formik.errors?.kycInfo?.sourceOfWealth || [];

  // Calculate total wealth dynamically
  const totalWealth = useMemo(
    () =>
      sourcesOfWealth.reduce(
        (sum, wealth) => sum + (wealth.sourceOfWealthAmount || 0),
        0
      ),
    [sourcesOfWealth]
  );

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Source of Wealth (D)
      </h3>
      <p className="text-sm mb-4 text-gray-600">
        This section identifies the origin of your wealth, such as any
        inheritance or donations you may have received. It's important for
        financial transparency.
      </p>
      {sourcesOfWealth.map((wealth, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">
            Source of Wealth {index + 1}
          </h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Wealth Type */}
            <div>
              <label
                htmlFor={`kycInfo.sourceOfWealth[${index}].sourceOfWealthType`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`kycInfo.sourceOfWealth[${index}].sourceOfWealthType`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(
                  `kycInfo.sourceOfWealth[${index}].sourceOfWealthType`
                )}
                value={
                  isOfficer
                    ? wealth.sourceOfWealthType ||
                      SourceOfWealthType.Inheritance
                    : wealth.sourceOfWealthType
                }
                disabled={isOfficer}
              >
                <option value="inheritance">Inheritance</option>
                <option value="donation">Donation</option>
              </select>
            </div>

            {/* Wealth Amount */}
            <div>
              <label
                htmlFor={`kycInfo.sourceOfWealth[${index}].sourceOfWealthAmount`}
                className="block text-sm font-medium"
              >
                Amount (Currency)
              </label>
              <input
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                id={`kycInfo.sourceOfWealth[${index}].sourceOfWealthAmount`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter amount"
                readOnly={isOfficer}
                {...getFieldProps(
                  `kycInfo.sourceOfWealth[${index}].sourceOfWealthAmount`
                )}
                value={
                  isOfficer
                    ? wealth.sourceOfWealthAmount || 0
                    : wealth.sourceOfWealthAmount || ""
                }
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (
                      errorsSourcesOfWealth[
                        index
                      ] as FormikErrors<SourceOfWealth>
                    )?.sourceOfWealthAmount
                  }
                  touched={touchedSourcesOfWealth[index]?.sourceOfWealthAmount}
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
                const updatedSourcesOfWealth = sourcesOfWealth.filter(
                  (_, i) => i !== index
                );
                setFieldValue("kycInfo.sourceOfWealth", updatedSourcesOfWealth);
              }}
            >
              Delete Source of Wealth
            </button>
          )}
        </div>
      ))}

      {/* Total Source of Wealth */}
      <div className="mt-4">
        <label
          htmlFor="sourceOfWealthTotal"
          className="block text-sm font-medium"
        >
          Total Source of Wealth
        </label>
        <input
          type="number"
          id="sourceOfWealthTotal"
          className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
          value={totalWealth}
          readOnly
        />
      </div>

      {/* Add Source of Wealth Button */}
      {!isOfficer && (
        <button
          type="button"
          className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
          onClick={() => {
            const newSourceOfWealth: SourceOfWealth = {
              sourceOfWealthType: SourceOfWealthType.Inheritance,
              sourceOfWealthAmount: null,
            };
            setFieldValue("kycInfo.sourceOfWealth", [
              ...sourcesOfWealth,
              newSourceOfWealth,
            ]);
          }}
        >
          Add Source of Wealth
        </button>
      )}
    </div>
  );
}

export default SourceOfWealthsPanel;
