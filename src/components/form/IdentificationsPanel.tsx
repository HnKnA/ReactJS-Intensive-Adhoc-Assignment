import React from "react";
import { FormikProps, FormikErrors } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import DateChoosing from "../datetime/DateChoosing";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Identification,
} from "../../services/types/EditInfoFormValues";

interface IdentificationsPanelProps {
  formik: FormikProps<EditInfoFormValues>;
  userEditInfo: EditInfoFormValues | undefined;
  isOfficer: boolean;
}

function IdentificationsPanel({
  formik,
  userEditInfo,
  isOfficer,
}: IdentificationsPanelProps) {
  const { getFieldProps } = formik;

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Identification Documents
      </h3>
      {formik.values.identification.map((idf, index) => (
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
                {...getFieldProps(`identification[${index}].idType`)}
                value={
                  isOfficer
                    ? userEditInfo?.identification?.[index]?.idType ||
                      "national-id"
                    : formik.values.identification[index]?.idType
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
                      formik.errors.identification?.[
                        index
                      ] as FormikErrors<Identification>
                    )?.idType
                  }
                  touched={formik.touched.identification?.[index]?.idType}
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
                name={`identification[${index}].idExpired`}
                minDate={new Date()}
                maxDate={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() + 10)
                  )
                }
                placeholderText={
                  isOfficer && userEditInfo?.identification?.[index]?.idExpired
                    ? `${new Date(
                        userEditInfo.identification?.[index]
                          ?.idExpired as unknown as string
                      ).toLocaleDateString("en-GB")}`
                    : "DD/MM/YYYY"
                }
                onFocus={() => {
                  if (
                    isOfficer &&
                    !formik.values.identification?.[index]?.idExpired
                  ) {
                    const expAsDate =
                      userEditInfo?.identification?.[index]?.idExpired &&
                      !isNaN(
                        new Date(
                          userEditInfo.identification?.[index]
                            ?.idExpired as unknown as string
                        ).getTime()
                      )
                        ? new Date(
                            userEditInfo.identification?.[index]
                              ?.idExpired as unknown as string
                          )
                        : null;

                    formik.setFieldValue(
                      `identification[${index}].idExpired`,
                      expAsDate
                    );
                  }
                }}
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
                  {userEditInfo?.identification?.[index]?.idFile?.name ||
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
                        `identification[${index}].idFile`,
                        true
                      );
                      formik.setFieldValue(
                        `identification[${index}].idFile`,
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
                      formik.errors.identification?.[
                        index
                      ] as FormikErrors<Identification>
                    )?.idFile
                  }
                  touched={formik.touched.identification?.[index]?.idFile}
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
                const updatedIdentifications =
                  formik.values.identification.filter(
                    (_, idfIndex) => idfIndex !== index
                  );
                formik.setFieldValue("identification", updatedIdentifications);
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
          formik.setFieldValue("identification", [
            ...formik.values.identification,
            {
              idType: "national-id",
              idExpired: null,
              idFile: null,
            },
          ]);
        }}
        hidden={isOfficer}
      >
        Add Identification
      </button>
    </div>
  );
}

export default IdentificationsPanel;
