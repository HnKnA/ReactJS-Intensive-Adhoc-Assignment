import React from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Email,
} from "../../services/types/EditInfoFormValues";
import { KycFormValues } from "../../services/types/KycFormValues";

interface EmailsPanelProps {
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

function EmailsPanel({ formik, userEditInfo, isOfficer }: EmailsPanelProps) {
  const { getFieldProps } = formik;

  const emailValues = isKycFormValues(formik.values)
    ? formik.values.personalInfo.email
    : formik.values.email;

  const userEmailValues = userEditInfo
    ? isKycFormValues(userEditInfo)
      ? userEditInfo.personalInfo.email
      : userEditInfo.email
    : [];

  const touchedEmails = formik.touched
    ? isKycFormValues(formik.values)
      ? (formik.touched as FormikTouched<KycFormValues>).personalInfo?.email
      : (formik.touched as FormikTouched<EditInfoFormValues>).email
    : [];

  const errorsEmails = formik.errors
    ? isKycFormValues(formik.values)
      ? (formik.errors as FormikErrors<KycFormValues>).personalInfo?.email
      : (formik.errors as FormikErrors<EditInfoFormValues>).email
    : [];

  return (
    <div className={`${styles.panel} mb-6`}>
      <h4 className="text-md font-semibold mb-4">Emails</h4>
      {emailValues.map((eml, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">Email {index + 1}</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Email Address */}
            <div>
              <label
                htmlFor={`email[${index}].emailAddress`}
                className="block text-sm font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id={`email[${index}].emailAddress`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder={
                  isOfficer
                    ? userEmailValues?.[index]?.emailAddress || "N/A"
                    : "Enter email address"
                }
                readOnly={isOfficer}
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.email[${index}].emailAddress`
                    : `email[${index}].emailAddress`
                )}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsEmails?.[index] as FormikErrors<Email>)?.emailAddress
                  }
                  touched={touchedEmails?.[index]?.emailAddress}
                />
              )}
            </div>

            {/* Email Type */}
            <div>
              <label
                htmlFor={`email[${index}].emailType`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`email[${index}].emailType`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.email[${index}].emailType`
                    : `email[${index}].emailType`
                )}
                value={
                  isOfficer
                    ? userEmailValues?.[index]?.emailType || "personal"
                    : emailValues[index]?.emailType
                }
                disabled={isOfficer}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
            </div>

            {/* Email Preferred */}
            <div>
              <label
                htmlFor={`email[${index}].emailPreferred`}
                className="block text-sm font-medium"
              >
                Preferred
              </label>
              <select
                id={`email[${index}].emailPreferred`}
                name={`email[${index}].emailPreferred`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                onChange={(e) => {
                  formik.setFieldValue(
                    isKycFormValues(formik.values)
                      ? `personalInfo.email[${index}].emailPreferred`
                      : `email[${index}].emailPreferred`,
                    e.target.value === "true"
                  );
                }}
                onBlur={formik.handleBlur}
                value={
                  isOfficer
                    ? userEmailValues?.[index]?.emailPreferred?.toString() ||
                      "false"
                    : emailValues[index]?.emailPreferred.toString()
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
                const updatedEmails = emailValues.filter(
                  (_, emlIndex) => emlIndex !== index
                );
                formik.setFieldValue(
                  isKycFormValues(formik.values)
                    ? `personalInfo.email`
                    : `email`,
                  updatedEmails
                );
              }}
            >
              Delete Email
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
        onClick={() => {
          const newEmail = {
            emailAddress: "",
            emailType: "personal",
            emailPreferred: true,
          };
          formik.setFieldValue(
            isKycFormValues(formik.values) ? `personalInfo.email` : `email`,
            [...emailValues, newEmail]
          );
        }}
        hidden={isOfficer}
      >
        Add Email
      </button>
    </div>
  );
}

export default EmailsPanel;
