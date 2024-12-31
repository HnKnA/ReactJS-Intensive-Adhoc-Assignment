import React from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import DateChoosing from "../datetime/DateChoosing";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../assets/css/Form.module.css";
import { EditInfoFormValues } from "../../services/types/EditInfoFormValues";
import { KycFormValues } from "../../services/types/KycFormValues";

interface BasicInformationProps {
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

function BasicInformation({
  formik,
  userEditInfo,
  isOfficer,
}: BasicInformationProps) {
  const { getFieldProps } = formik;

  // Dynamically determine the path for basic information data
  const basicInfoValues = isKycFormValues(formik.values)
    ? formik.values.personalInfo
    : formik.values;

  const userBasicInfo = userEditInfo
    ? isKycFormValues(userEditInfo)
      ? userEditInfo.personalInfo
      : userEditInfo
    : undefined;

  const touchedBasicInfo = formik.touched
    ? isKycFormValues(formik.values)
      ? (formik.touched as FormikTouched<KycFormValues>).personalInfo
      : (formik.touched as FormikTouched<EditInfoFormValues>)
    : undefined;

  const errorsBasicInfo = formik.errors
    ? isKycFormValues(formik.values)
      ? (formik.errors as FormikErrors<KycFormValues>).personalInfo
      : (formik.errors as FormikErrors<EditInfoFormValues>)
    : undefined;

  return (
    <div className={`border ${styles.panel} rounded-md p-4`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Basic Information
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            placeholder={
              isOfficer ? userBasicInfo?.firstName : "Enter your first name"
            }
            {...getFieldProps(
              isKycFormValues(formik.values)
                ? `personalInfo.firstName`
                : `firstName`
            )}
            readOnly={isOfficer}
            onFocus={() => {
              if (isOfficer && !basicInfoValues.firstName) {
                formik.setFieldValue(
                  isKycFormValues(formik.values)
                    ? `personalInfo.firstName`
                    : `firstName`,
                  userBasicInfo?.firstName || ""
                );
              }
            }}
          />
          {!isOfficer && (
            <FormErrorMessage
              error={errorsBasicInfo?.firstName}
              touched={touchedBasicInfo?.firstName}
            />
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            placeholder={
              isOfficer ? userBasicInfo?.lastName : "Enter your last name"
            }
            {...getFieldProps(
              isKycFormValues(formik.values)
                ? `personalInfo.lastName`
                : `lastName`
            )}
            readOnly={isOfficer}
            onFocus={() => {
              if (isOfficer && !basicInfoValues.lastName) {
                formik.setFieldValue(
                  isKycFormValues(formik.values)
                    ? `personalInfo.lastName`
                    : `lastName`,
                  userBasicInfo?.lastName || ""
                );
              }
            }}
          />
          {!isOfficer && (
            <FormErrorMessage
              error={errorsBasicInfo?.lastName}
              touched={touchedBasicInfo?.lastName}
            />
          )}
        </div>

        {/* Middle Name */}
        <div>
          <label htmlFor="middleName" className="block text-sm font-medium">
            Middle Name
          </label>
          <input
            type="text"
            id="middleName"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            placeholder={
              isOfficer ? userBasicInfo?.middleName : "Enter your middle name"
            }
            readOnly={isOfficer}
            {...getFieldProps(
              isKycFormValues(formik.values)
                ? `personalInfo.middleName`
                : `middleName`
            )}
            onFocus={() => {
              if (isOfficer && !basicInfoValues.middleName) {
                formik.setFieldValue(
                  isKycFormValues(formik.values)
                    ? `personalInfo.middleName`
                    : `middleName`,
                  userBasicInfo?.middleName || ""
                );
              }
            }}
          />
        </div>

        {/* DOB */}
        <div>
          <label htmlFor="dob" className="block text-sm font-medium">
            Date of Birth
          </label>
          <DateChoosing
            name={isKycFormValues(formik.values) ? `personalInfo.dob` : `dob`}
            withAgeCalculate
            placeholderText={
              isOfficer && userBasicInfo?.dob
                ? `${new Date(userBasicInfo.dob).toLocaleDateString("en-GB")}`
                : "DD/MM/YYYY"
            }
            onFocus={() => {
              if (isOfficer && !basicInfoValues.dob) {
                const dobAsDate =
                  userBasicInfo?.dob &&
                  !isNaN(new Date(userBasicInfo.dob).getTime())
                    ? new Date(userBasicInfo.dob)
                    : null;

                formik.setFieldValue(
                  isKycFormValues(formik.values) ? `personalInfo.dob` : `dob`,
                  dobAsDate
                );
              }
            }}
            readOnly={isOfficer}
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium">
            Age
          </label>
          <input
            type="number"
            id="age"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            placeholder={
              isOfficer
                ? userBasicInfo?.age?.toString() || "Age not available"
                : "0"
            }
            {...getFieldProps(
              isKycFormValues(formik.values) ? `personalInfo.age` : `age`
            )}
            value={isOfficer ? undefined : basicInfoValues.age || ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInformation;
