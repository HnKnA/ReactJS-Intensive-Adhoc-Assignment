import React from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import DateChoosing from "../datetime/DateChoosing";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Occupation,
} from "../../services/types/EditInfoFormValues";
import { KycFormValues } from "../../services/types/KycFormValues";

interface OccupationsPanelProps {
  formik: FormikProps<EditInfoFormValues> | FormikProps<KycFormValues>;
  userEditInfo: EditInfoFormValues | KycFormValues | undefined;
  isOfficer: boolean;
}

// Type guard to determine if formik.values is of KycFormValues
const isKycFormValues = (
  values: EditInfoFormValues | KycFormValues
): values is KycFormValues => {
  return (values as KycFormValues).personalInfo !== undefined;
};

function OccupationsPanel({
  formik,
  userEditInfo,
  isOfficer,
}: OccupationsPanelProps) {
  const { getFieldProps } = formik;

  // Dynamically determine the path for occupation data
  const occupationValues = isKycFormValues(formik.values)
    ? formik.values.personalInfo.occupation
    : formik.values.occupation;

  const userOccupationValues = userEditInfo
    ? isKycFormValues(userEditInfo)
      ? userEditInfo.personalInfo.occupation
      : userEditInfo.occupation
    : [];

  const touchedOccupation = formik.touched
    ? isKycFormValues(formik.values)
      ? (formik.touched as FormikTouched<KycFormValues>).personalInfo
          ?.occupation
      : (formik.touched as FormikTouched<EditInfoFormValues>).occupation
    : [];

  const errorsOccupation = formik.errors
    ? isKycFormValues(formik.values)
      ? (formik.errors as FormikErrors<KycFormValues>).personalInfo?.occupation
      : (formik.errors as FormikErrors<EditInfoFormValues>).occupation
    : [];

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Occupations
      </h3>
      {occupationValues.map((occ, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">Occupation {index + 1}</h5>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* Occupation Field */}
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
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.occupation[${index}].occupation`
                    : `occupation[${index}].occupation`
                )}
                value={
                  isOfficer
                    ? userOccupationValues?.[index]?.occupation || "unemployed"
                    : occupationValues[index]?.occupation
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
                    typeof errorsOccupation?.[index] === "object"
                      ? (errorsOccupation?.[index] as FormikErrors<Occupation>)
                          ?.occupation
                      : (errorsOccupation?.[index] as string | undefined)
                  }
                  touched={touchedOccupation?.[index]?.occupation}
                />
              )}
            </div>

            {/* Occupation From */}
            <div>
              <label
                htmlFor={`occupation[${index}].occupationFrom`}
                className="block text-sm font-medium"
              >
                From Date
              </label>
              <DateChoosing
                name={
                  isKycFormValues(formik.values)
                    ? `personalInfo.occupation[${index}].occupationFrom`
                    : `occupation[${index}].occupationFrom`
                }
                placeholderText={
                  isOfficer && userOccupationValues?.[index]?.occupationFrom
                    ? `${new Date(
                        userOccupationValues[index]
                          ?.occupationFrom as unknown as string
                      ).toLocaleDateString("en-GB")}`
                    : "DD/MM/YYYY"
                }
                readOnly={isOfficer}
              />
            </div>

            {/* Occupation To */}
            <div>
              <label
                htmlFor={`occupation[${index}].occupationTo`}
                className="block text-sm font-medium"
              >
                To Date
              </label>
              <DateChoosing
                name={
                  isKycFormValues(formik.values)
                    ? `personalInfo.occupation[${index}].occupationTo`
                    : `occupation[${index}].occupationTo`
                }
                placeholderText={
                  isOfficer && userOccupationValues?.[index]?.occupationTo
                    ? `${new Date(
                        userOccupationValues[index]
                          ?.occupationTo as unknown as string
                      ).toLocaleDateString("en-GB")}`
                    : "DD/MM/YYYY"
                }
                readOnly={isOfficer}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    typeof errorsOccupation?.[index] === "object"
                      ? (errorsOccupation?.[index] as FormikErrors<Occupation>)
                          ?.occupationTo
                      : (errorsOccupation?.[index] as string | undefined)
                  }
                  touched={touchedOccupation?.[index]?.occupationTo}
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
                const updatedOccupations = occupationValues.filter(
                  (_, occIndex) => occIndex !== index
                );
                formik.setFieldValue(
                  isKycFormValues(formik.values)
                    ? `personalInfo.occupation`
                    : `occupation`,
                  updatedOccupations
                );
              }}
            >
              Delete Occupation
            </button>
          )}
        </div>
      ))}

      {/* Add Occupation Button */}
      <button
        type="button"
        className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
        onClick={() => {
          const newOccupation = {
            occupation: "unemployed",
            occupationFrom: null,
            occupationTo: null,
          };
          formik.setFieldValue(
            isKycFormValues(formik.values)
              ? `personalInfo.occupation`
              : `occupation`,
            [...occupationValues, newOccupation]
          );
        }}
        hidden={isOfficer}
      >
        Add Occupation
      </button>
    </div>
  );
}

export default OccupationsPanel;
