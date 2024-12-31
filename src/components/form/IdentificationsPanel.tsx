import React from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import DateChoosing from "../datetime/DateChoosing";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Identification,
} from "../../services/types/EditInfoFormValues";
import { KycFormValues } from "../../services/types/KycFormValues";

interface IdentificationsPanelProps {
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

function IdentificationsPanel({
  formik,
  userEditInfo,
  isOfficer,
}: IdentificationsPanelProps) {
  const { getFieldProps } = formik;

  const identificationValues = isKycFormValues(formik.values)
    ? formik.values.personalInfo.identification
    : formik.values.identification;

  const userIdentificationValues = userEditInfo
    ? isKycFormValues(userEditInfo)
      ? userEditInfo.personalInfo.identification
      : userEditInfo.identification
    : [];

  const touchedIdentification = formik.touched
    ? isKycFormValues(formik.values)
      ? (formik.touched as FormikTouched<KycFormValues>).personalInfo
          ?.identification
      : (formik.touched as FormikTouched<EditInfoFormValues>).identification
    : [];

  const errorsIdentification = formik.errors
    ? isKycFormValues(formik.values)
      ? (formik.errors as FormikErrors<KycFormValues>).personalInfo
          ?.identification
      : (formik.errors as FormikErrors<EditInfoFormValues>).identification
    : [];

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Identification Documents
      </h3>
      {identificationValues.map((idf, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">
            Identification {index + 1}
          </h5>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* ID Type */}
            <div>
              <label
                htmlFor={`identification[${index}].idType`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`identification[${index}].idType`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.identification[${index}].idType`
                    : `identification[${index}].idType`
                )}
                value={
                  isOfficer
                    ? userIdentificationValues?.[index]?.idType || "national-id"
                    : identificationValues[index]?.idType
                }
                disabled={isOfficer}
              >
                <option value="national-id">National ID Card</option>
                <option value="passport">Passport</option>
                <option value="driver-license">Driver License</option>
              </select>
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (
                      errorsIdentification?.[
                        index
                      ] as FormikErrors<Identification>
                    )?.idType
                  }
                  touched={touchedIdentification?.[index]?.idType}
                />
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label
                htmlFor={`identification[${index}].idExpired`}
                className="block text-sm font-medium"
              >
                Expiry Date
              </label>
              <DateChoosing
                name={
                  isKycFormValues(formik.values)
                    ? `personalInfo.identification[${index}].idExpired`
                    : `identification[${index}].idExpired`
                }
                minDate={new Date()}
                maxDate={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() + 10)
                  )
                }
                placeholderText={
                  isOfficer && userIdentificationValues?.[index]?.idExpired
                    ? `${new Date(
                        userIdentificationValues[index]
                          ?.idExpired as unknown as string
                      ).toLocaleDateString("en-GB")}`
                    : "DD/MM/YYYY"
                }
                readOnly={isOfficer}
              />
            </div>

            {/* Upload Document */}
            <div>
              <label
                htmlFor={`identification[${index}].idFile`}
                className="block text-sm font-medium"
              >
                Upload Document
              </label>
              {isOfficer ? (
                <div className="w-full mt-2 px-4 py-2 border rounded-md bg-gray-100 text-gray-700">
                  {userIdentificationValues?.[index]?.idFile?.name ||
                    "No file uploaded"}
                </div>
              ) : (
                <input
                  type="file"
                  id={`identification[${index}].idFile`}
                  name={`identification[${index}].idFile`}
                  className="w-full mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      formik.setFieldTouched(
                        isKycFormValues(formik.values)
                          ? `personalInfo.identification[${index}].idFile`
                          : `identification[${index}].idFile`,
                        true
                      );
                      formik.setFieldValue(
                        isKycFormValues(formik.values)
                          ? `personalInfo.identification[${index}].idFile`
                          : `identification[${index}].idFile`,
                        event.currentTarget.files[0]
                      );
                    }
                  }}
                />
              )}
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (
                      errorsIdentification?.[
                        index
                      ] as FormikErrors<Identification>
                    )?.idFile
                  }
                  touched={touchedIdentification?.[index]?.idFile}
                />
              )}
            </div>
          </div>

          {/* Delete Button */}
          {index > 0 && (
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm"
              onClick={() => {
                const updatedIdentifications = identificationValues.filter(
                  (_, idfIndex) => idfIndex !== index
                );
                formik.setFieldValue(
                  isKycFormValues(formik.values)
                    ? `personalInfo.identification`
                    : `identification`,
                  updatedIdentifications
                );
              }}
            >
              Delete Identification
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
        onClick={() => {
          const newIdentification = {
            idType: "national-id",
            idExpired: null,
            idFile: null,
          };
          formik.setFieldValue(
            isKycFormValues(formik.values)
              ? `personalInfo.identification`
              : `identification`,
            [...identificationValues, newIdentification]
          );
        }}
        hidden={isOfficer}
      >
        Add Identification
      </button>
    </div>
  );
}

export default IdentificationsPanel;
