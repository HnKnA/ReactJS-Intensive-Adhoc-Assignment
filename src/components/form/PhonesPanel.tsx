import React from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Phone,
} from "../../services/types/EditInfoFormValues";
import { KycFormValues } from "../../services/types/KycFormValues";

interface PhonesPanelProps {
  formik: FormikProps<EditInfoFormValues> | FormikProps<KycFormValues>;
  userEditInfo: EditInfoFormValues | KycFormValues | undefined;
  isOfficer: boolean;
}

// Type guard to check if formik.values is of KycFormValues
const isKycFormValues = (
  values: EditInfoFormValues | KycFormValues
): values is KycFormValues => {
  return (values as KycFormValues).personalInfo !== undefined;
};

function PhonesPanel({ formik, userEditInfo, isOfficer }: PhonesPanelProps) {
  const { getFieldProps } = formik;

  const phoneValues = isKycFormValues(formik.values)
    ? formik.values.personalInfo.phone
    : formik.values.phone;

  const userPhoneValues = userEditInfo
    ? isKycFormValues(userEditInfo)
      ? userEditInfo.personalInfo.phone
      : userEditInfo.phone
    : [];

  const touchedPhones = formik.touched
    ? isKycFormValues(formik.values)
      ? (formik.touched as FormikTouched<KycFormValues>).personalInfo?.phone
      : (formik.touched as FormikTouched<EditInfoFormValues>).phone
    : [];

  const errorsPhones = formik.errors
    ? isKycFormValues(formik.values)
      ? (formik.errors as FormikErrors<KycFormValues>).personalInfo?.phone
      : (formik.errors as FormikErrors<EditInfoFormValues>).phone
    : [];

  return (
    <div className={`${styles.panel} mb-6`}>
      <h4 className="text-md font-semibold mb-4">Phones</h4>
      {phoneValues.map((phn, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">Phone {index + 1}</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Phone Number */}
            <div>
              <label
                htmlFor={`phone[${index}].phoneNumber`}
                className="block text-sm font-medium"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id={`phone[${index}].phoneNumber`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder={
                  isOfficer
                    ? userPhoneValues?.[index]?.phoneNumber || "N/A"
                    : "Enter phone number"
                }
                readOnly={isOfficer}
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.phone[${index}].phoneNumber`
                    : `phone[${index}].phoneNumber`
                )}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsPhones?.[index] as FormikErrors<Phone>)?.phoneNumber
                  }
                  touched={touchedPhones?.[index]?.phoneNumber}
                />
              )}
            </div>

            {/* Phone Type */}
            <div>
              <label
                htmlFor={`phone[${index}].phoneType`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`phone[${index}].phoneType`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.phone[${index}].phoneType`
                    : `phone[${index}].phoneType`
                )}
                value={
                  isOfficer
                    ? userPhoneValues?.[index]?.phoneType || "personal"
                    : phoneValues[index]?.phoneType
                }
                disabled={isOfficer}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
            </div>

            {/* Phone Preferred */}
            <div>
              <label
                htmlFor={`phone[${index}].phonePreferred`}
                className="block text-sm font-medium"
              >
                Preferred
              </label>
              <select
                id={`phone[${index}].phonePreferred`}
                name={`phone[${index}].phonePreferred`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                onChange={(e) => {
                  formik.setFieldValue(
                    isKycFormValues(formik.values)
                      ? `personalInfo.phone[${index}].phonePreferred`
                      : `phone[${index}].phonePreferred`,
                    e.target.value === "true"
                  );
                }}
                onBlur={formik.handleBlur}
                value={
                  isOfficer
                    ? userPhoneValues?.[index]?.phonePreferred?.toString() ||
                      "false"
                    : phoneValues[index]?.phonePreferred.toString()
                }
                disabled={isOfficer}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* Delete Button */}
          {index > 0 && (
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm"
              onClick={() => {
                const updatedPhones = phoneValues.filter(
                  (_, phnIndex) => phnIndex !== index
                );
                formik.setFieldValue(
                  isKycFormValues(formik.values)
                    ? `personalInfo.phone`
                    : `phone`,
                  updatedPhones
                );
              }}
            >
              Delete Phone
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
        onClick={() => {
          const newPhone = {
            phoneNumber: "",
            phoneType: "personal",
            phonePreferred: true,
          };
          formik.setFieldValue(
            isKycFormValues(formik.values) ? `personalInfo.phone` : `phone`,
            [...phoneValues, newPhone]
          );
        }}
        hidden={isOfficer}
      >
        Add Phone
      </button>
    </div>
  );
}

export default PhonesPanel;
