import React from "react";
import { FormikProps } from "formik";
import DateChoosing from "../datetime/DateChoosing";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../assets/css/Form.module.css";
import { EditInfoFormValues } from "../../services/types/EditInfoFormValues";

interface BasicInformationProps {
  formik: FormikProps<EditInfoFormValues>;
  userEditInfo: EditInfoFormValues | undefined;
  isOfficer: boolean;
}

function BasicInformation({
  formik,
  userEditInfo,
  isOfficer,
}: BasicInformationProps) {
  const { getFieldProps } = formik;

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
              isOfficer ? userEditInfo?.firstName : "Enter your first name"
            }
            {...getFieldProps("firstName")}
            readOnly={isOfficer}
            onFocus={() => {
              if (isOfficer && !formik.values.firstName) {
                formik.setFieldValue(
                  "firstName",
                  userEditInfo?.firstName || ""
                );
              }
            }}
          />
          {!isOfficer && (
            <FormErrorMessage
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
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
              isOfficer ? userEditInfo?.lastName : "Enter your last name"
            }
            {...getFieldProps("lastName")}
            readOnly={isOfficer}
            onFocus={() => {
              if (isOfficer && !formik.values.lastName) {
                formik.setFieldValue("lastName", userEditInfo?.lastName || "");
              }
            }}
          />
          {!isOfficer && (
            <FormErrorMessage
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
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
              isOfficer ? userEditInfo?.middleName : "Enter your middle name"
            }
            readOnly={isOfficer}
            {...getFieldProps("middleName")}
            onFocus={() => {
              if (isOfficer && !formik.values.middleName) {
                formik.setFieldValue(
                  "middleName",
                  userEditInfo?.middleName || ""
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
            name="dob"
            withAgeCalculate
            placeholderText={
              isOfficer && userEditInfo?.dob
                ? `${new Date(userEditInfo.dob).toLocaleDateString("en-GB")}`
                : "DD/MM/YYYY"
            }
            onFocus={() => {
              if (isOfficer && !formik.values.dob) {
                const dobAsDate =
                  userEditInfo?.dob &&
                  !isNaN(new Date(userEditInfo.dob).getTime())
                    ? new Date(userEditInfo.dob)
                    : null;

                formik.setFieldValue("dob", dobAsDate);
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
                ? userEditInfo?.age?.toString() || "Age not available"
                : "This is your calculated age"
            }
            {...getFieldProps("age")}
            value={isOfficer ? undefined : formik.values.age || ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInformation;
