import React from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import styles from "../../assets/css/Form.module.css";
import {
  KycFormValues,
  Income,
  IncomeType,
} from "../../services/types/KycFormValues";
import FormErrorMessage from "./FormErrorMessage";

interface IncomesPanelProps {
  formik: FormikProps<KycFormValues>;
  userEditInfo: KycFormValues | undefined;
  isOfficer: boolean;
}

function IncomesPanel({ formik, userEditInfo, isOfficer }: IncomesPanelProps) {
  const { getFieldProps, setFieldValue } = formik;

  const incomes = formik.values.kycInfo?.income || [];
  const userIncomes = userEditInfo?.kycInfo?.income || [];
  const touchedIncomes = formik.touched?.kycInfo?.income || [];
  const errorsIncomes = formik.errors?.kycInfo?.income || [];

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Incomes (A)
      </h3>
      {incomes.map((income, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">Income {index + 1}</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Income Type */}
            <div>
              <label
                htmlFor={`kycInfo.income[${index}].incomeType`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`kycInfo.income[${index}].incomeType`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(`kycInfo.income[${index}].incomeType`)}
                value={
                  isOfficer
                    ? userIncomes[index]?.incomeType || IncomeType.Salary
                    : incomes[index]?.incomeType
                }
                disabled={isOfficer}
              >
                <option value="salary">Salary</option>
                <option value="investment">Investment</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Income Amount */}
            <div>
              <label
                htmlFor={`kycInfo.income[${index}].incomeAmount`}
                className="block text-sm font-medium"
              >
                Amount (Currency)
              </label>
              <input
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                id={`kycInfo.income[${index}].incomeAmount`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter amount"
                readOnly={isOfficer}
                {...getFieldProps(`kycInfo.income[${index}].incomeAmount`)}
                value={
                  isOfficer
                    ? userIncomes[index]?.incomeAmount || 0
                    : incomes[index]?.incomeAmount || ""
                }
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsIncomes[index] as FormikErrors<Income>)?.incomeAmount
                  }
                  touched={touchedIncomes[index]?.incomeAmount}
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
                const updatedIncomes = incomes.filter((_, i) => i !== index);
                setFieldValue("kycInfo.income", updatedIncomes);
              }}
            >
              Delete Income
            </button>
          )}
        </div>
      ))}

      {/* Add Income Button */}
      {!isOfficer && (
        <button
          type="button"
          className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
          onClick={() => {
            const newIncome: Income = {
              incomeType: IncomeType.Salary,
              incomeAmount: null,
            };
            setFieldValue("kycInfo.income", [...incomes, newIncome]);
          }}
        >
          Add Income
        </button>
      )}
    </div>
  );
}

export default IncomesPanel;
