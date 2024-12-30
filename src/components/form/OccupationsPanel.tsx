import React from "react";
import { FormikProps, FormikErrors } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import DateChoosing from "../datetime/DateChoosing";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Occupation,
} from "../../services/types/EditInfoFormValues";

interface OccupationsPanelProps {
  formik: FormikProps<EditInfoFormValues>;
  userEditInfo: EditInfoFormValues | undefined;
  isOfficer: boolean;
}

function OccupationsPanel({
  formik,
  userEditInfo,
  isOfficer,
}: OccupationsPanelProps) {
  const { getFieldProps } = formik;

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Occupations
      </h3>
      {formik.values.occupation.map((occ, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">Occupation {index + 1}</h5>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor={`occupation[${index}].occupation`}
                className="block text-sm font-medium"
              >
                Occupation
              </label>
              <select
                id={`occupation[${index}].occupation`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(`occupation[${index}].occupation`)}
                value={
                  isOfficer
                    ? userEditInfo?.occupation?.[index]?.occupation ||
                      "unemployed"
                    : formik.values.occupation[index]?.occupation
                }
                disabled={isOfficer}
              >
                <option value="unemployed">Unemployed</option>
                <option value="engineer">Engineer</option>
                <option value="teacher">Teacher</option>
                <option value="doctor">Doctor</option>
                <option value="others">Others</option>
              </select>
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (
                      formik.errors.occupation?.[
                        index
                      ] as FormikErrors<Occupation>
                    )?.occupation
                  }
                  touched={formik.touched.occupation?.[index]?.occupation}
                />
              )}
            </div>

            <div>
              <label
                htmlFor={`occupation[${index}].occupationFrom`}
                className="block text-sm font-medium"
              >
                From Date
              </label>
              <DateChoosing
                name={`occupation[${index}].occupationFrom`}
                placeholderText={
                  isOfficer && userEditInfo?.occupation?.[index]?.occupationFrom
                    ? `${new Date(
                        userEditInfo.occupation?.[index]
                          ?.occupationFrom as unknown as string
                      ).toLocaleDateString("en-GB")}`
                    : "DD/MM/YYYY"
                }
                onFocus={() => {
                  if (
                    isOfficer &&
                    !formik.values.occupation?.[index]?.occupationFrom
                  ) {
                    const ocfAsDate =
                      userEditInfo?.occupation?.[index]?.occupationFrom &&
                      !isNaN(
                        new Date(
                          userEditInfo.occupation?.[index]
                            ?.occupationFrom as unknown as string
                        ).getTime()
                      )
                        ? new Date(
                            userEditInfo.occupation?.[index]
                              ?.occupationFrom as unknown as string
                          )
                        : null;

                    formik.setFieldValue(
                      `occupation[${index}].occupationFrom`,
                      ocfAsDate
                    );
                  }
                }}
                readOnly={isOfficer}
              />
            </div>

            <div>
              <label
                htmlFor={`occupation[${index}].occupationTo`}
                className="block text-sm font-medium"
              >
                To Date
              </label>
              <DateChoosing
                name={`occupation[${index}].occupationTo`}
                placeholderText={
                  isOfficer && userEditInfo?.occupation?.[index]?.occupationTo
                    ? `${new Date(
                        userEditInfo.occupation?.[index]
                          ?.occupationTo as unknown as string
                      ).toLocaleDateString("en-GB")}`
                    : "DD/MM/YYYY"
                }
                onFocus={() => {
                  if (
                    isOfficer &&
                    !formik.values.occupation?.[index]?.occupationTo
                  ) {
                    const octAsDate =
                      userEditInfo?.occupation?.[index]?.occupationTo &&
                      !isNaN(
                        new Date(
                          userEditInfo.occupation?.[index]
                            ?.occupationTo as unknown as string
                        ).getTime()
                      )
                        ? new Date(
                            userEditInfo.occupation?.[index]
                              ?.occupationTo as unknown as string
                          )
                        : null;

                    formik.setFieldValue(
                      `occupation[${index}].occupationTo`,
                      octAsDate
                    );
                  }
                }}
                readOnly={isOfficer}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (
                      formik.errors.occupation?.[
                        index
                      ] as FormikErrors<Occupation>
                    )?.occupationTo
                  }
                  touched={formik.touched.occupation?.[index]?.occupationTo}
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
                const updatedOccupations = formik.values.occupation.filter(
                  (_, occIndex) => occIndex !== index
                );
                formik.setFieldValue("occupation", updatedOccupations);
              }}
            >
              Delete Occupation
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
        onClick={() => {
          formik.setFieldValue("occupation", [
            ...formik.values.occupation,
            {
              occupation: "unemployed",
              occupationFrom: null,
              occupationTo: null,
            },
          ]);
        }}
        hidden={isOfficer}
      >
        Add Occupation
      </button>
    </div>
  );
}

export default OccupationsPanel;
