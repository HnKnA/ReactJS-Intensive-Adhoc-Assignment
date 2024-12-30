import React from "react";
import { FormikProps, FormikErrors } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Email,
} from "../../services/types/EditInfoFormValues";

interface EmailsPanelProps {
  formik: FormikProps<EditInfoFormValues>;
  userEditInfo: EditInfoFormValues | undefined;
  isOfficer: boolean;
}

function EmailsPanel({ formik, userEditInfo, isOfficer }: EmailsPanelProps) {
  const { getFieldProps } = formik;

  return (
    <div className={`${styles.panel} mb-6`}>
      <h4 className="text-md font-semibold mb-4">Emails</h4>
      {formik.values.email.map((eml, index) => (
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
                    ? userEditInfo?.email?.[index]?.emailAddress || "N/A"
                    : "Enter email address"
                }
                readOnly={isOfficer}
                onFocus={() => {
                  if (isOfficer && !formik.values.email[index]?.emailAddress) {
                    formik.setFieldValue(
                      `email[${index}].emailAddress`,
                      userEditInfo?.email?.[index]?.emailAddress || ""
                    );
                  }
                }}
                {...getFieldProps(`email[${index}].emailAddress`)}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (formik.errors.email?.[index] as FormikErrors<Email>)
                      ?.emailAddress
                  }
                  touched={formik.touched.email?.[index]?.emailAddress}
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
                {...getFieldProps(`email[${index}].emailType`)}
                value={
                  isOfficer
                    ? userEditInfo?.email?.[index]?.emailType || "personal"
                    : formik.values.email[index]?.emailType
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
                    `email[${index}].emailPreferred`,
                    e.target.value === "true"
                  );
                }}
                onBlur={formik.handleBlur}
                value={
                  isOfficer
                    ? userEditInfo?.email?.[
                        index
                      ]?.emailPreferred?.toString() || "false"
                    : formik.values.email[index].emailPreferred.toString()
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
                const updatedEmails = formik.values.email.filter(
                  (_, emlIndex) => emlIndex !== index
                );
                formik.setFieldValue("email", updatedEmails);
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
          formik.setFieldValue("email", [
            ...formik.values.email,
            {
              emailAddress: "",
              emailType: "personal",
              emailPreferred: true,
            },
          ]);
        }}
        hidden={isOfficer}
      >
        Add Email
      </button>
    </div>
  );
}

export default EmailsPanel;
