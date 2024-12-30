import React from "react";
import { FormikProps, FormikErrors } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Phone,
} from "../../services/types/EditInfoFormValues";

interface PhonesPanelProps {
  formik: FormikProps<EditInfoFormValues>;
  userEditInfo: EditInfoFormValues | undefined;
  isOfficer: boolean;
}

function PhonesPanel({ formik, userEditInfo, isOfficer }: PhonesPanelProps) {
  const { getFieldProps } = formik;

  return (
    <div className={`${styles.panel} mb-6`}>
      <h4 className="text-md font-semibold mb-4">Phones</h4>
      {formik.values.phone.map((phn, index) => (
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
                    ? userEditInfo?.phone?.[index]?.phoneNumber || "N/A"
                    : "Enter phone number"
                }
                readOnly={isOfficer}
                onFocus={() => {
                  if (isOfficer && !formik.values.phone[index]?.phoneNumber) {
                    formik.setFieldValue(
                      `phone[${index}].phoneNumber`,
                      userEditInfo?.phone?.[index]?.phoneNumber || ""
                    );
                  }
                }}
                {...getFieldProps(`phone[${index}].phoneNumber`)}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (formik.errors.phone?.[index] as FormikErrors<Phone>)
                      ?.phoneNumber
                  }
                  touched={formik.touched.phone?.[index]?.phoneNumber}
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
                {...getFieldProps(`phone[${index}].phoneType`)}
                value={
                  isOfficer
                    ? userEditInfo?.phone?.[index]?.phoneType || "personal"
                    : formik.values.phone[index]?.phoneType
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
                    `phone[${index}].phonePreferred`,
                    e.target.value === "true"
                  );
                }}
                onBlur={formik.handleBlur}
                value={
                  isOfficer
                    ? userEditInfo?.phone?.[
                        index
                      ]?.phonePreferred?.toString() || "false"
                    : formik.values.phone[index].phonePreferred.toString()
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
                const updatedPhones = formik.values.phone.filter(
                  (_, phnIndex) => phnIndex !== index
                );
                formik.setFieldValue("phone", updatedPhones);
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
          formik.setFieldValue("phone", [
            ...formik.values.phone,
            {
              phoneNumber: "",
              phoneType: "personal",
              phonePreferred: true,
            },
          ]);
        }}
        hidden={isOfficer}
      >
        Add Phone
      </button>
    </div>
  );
}

export default PhonesPanel;
