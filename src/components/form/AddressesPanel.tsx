import React from "react";
import { FormikProps, FormikErrors, FormikTouched } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Address,
} from "../../services/types/EditInfoFormValues";
import { KycFormValues } from "../../services/types/KycFormValues";

interface AddressesPanelProps {
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

function AddressesPanel({
  formik,
  userEditInfo,
  isOfficer,
}: AddressesPanelProps) {
  const { getFieldProps } = formik;

  // Dynamically determine the path for address data
  const addressValues = isKycFormValues(formik.values)
    ? formik.values.personalInfo.address
    : formik.values.address;

  const userAddressValues = userEditInfo
    ? isKycFormValues(userEditInfo)
      ? userEditInfo.personalInfo.address
      : userEditInfo.address
    : [];

  const touchedAddresses = formik.touched
    ? isKycFormValues(formik.values)
      ? (formik.touched as FormikTouched<KycFormValues>).personalInfo?.address
      : (formik.touched as FormikTouched<EditInfoFormValues>).address
    : [];

  const errorsAddresses = formik.errors
    ? isKycFormValues(formik.values)
      ? (formik.errors as FormikErrors<KycFormValues>).personalInfo?.address
      : (formik.errors as FormikErrors<EditInfoFormValues>).address
    : [];

  return (
    <div className={`${styles.panel} mb-6`}>
      <h4 className="text-md font-semibold mb-4">Addresses</h4>
      {addressValues.map((addr, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
        >
          <h5 className="text-lg font-medium mb-4">Address {index + 1}</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Country */}
            <div>
              <label
                htmlFor={`address[${index}].country`}
                className="block text-sm font-medium"
              >
                Country
              </label>
              <input
                type="text"
                id={`address[${index}].country`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder={
                  isOfficer
                    ? userAddressValues?.[index]?.country || "N/A"
                    : "Enter country"
                }
                readOnly={isOfficer}
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.address[${index}].country`
                    : `address[${index}].country`
                )}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsAddresses?.[index] as FormikErrors<Address>)?.country
                  }
                  touched={touchedAddresses?.[index]?.country}
                />
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor={`address[${index}].city`}
                className="block text-sm font-medium"
              >
                City
              </label>
              <input
                type="text"
                id={`address[${index}].city`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder={
                  isOfficer
                    ? userAddressValues?.[index]?.city || "N/A"
                    : "Enter city"
                }
                readOnly={isOfficer}
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.address[${index}].city`
                    : `address[${index}].city`
                )}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsAddresses?.[index] as FormikErrors<Address>)?.city
                  }
                  touched={touchedAddresses?.[index]?.city}
                />
              )}
            </div>

            {/* Street */}
            <div>
              <label
                htmlFor={`address[${index}].street`}
                className="block text-sm font-medium"
              >
                Street
              </label>
              <input
                type="text"
                id={`address[${index}].street`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder={
                  isOfficer
                    ? userAddressValues?.[index]?.street || "N/A"
                    : "Enter street"
                }
                readOnly={isOfficer}
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.address[${index}].street`
                    : `address[${index}].street`
                )}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsAddresses?.[index] as FormikErrors<Address>)?.street
                  }
                  touched={touchedAddresses?.[index]?.street}
                />
              )}
            </div>

            {/* Postal Code */}
            <div>
              <label
                htmlFor={`address[${index}].postalCode`}
                className="block text-sm font-medium"
              >
                Postal Code
              </label>
              <input
                type="text"
                id={`address[${index}].postalCode`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder={
                  isOfficer
                    ? userAddressValues?.[index]?.postalCode || "N/A"
                    : "Enter postal code"
                }
                readOnly={isOfficer}
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.address[${index}].postalCode`
                    : `address[${index}].postalCode`
                )}
              />
            </div>

            {/* Address Type */}
            <div>
              <label
                htmlFor={`address[${index}].addressType`}
                className="block text-sm font-medium"
              >
                Type
              </label>
              <select
                id={`address[${index}].addressType`}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                {...getFieldProps(
                  isKycFormValues(formik.values)
                    ? `personalInfo.address[${index}].addressType`
                    : `address[${index}].addressType`
                )}
                value={
                  isOfficer
                    ? userAddressValues?.[index]?.addressType || "mailing"
                    : addressValues[index]?.addressType
                }
                disabled={isOfficer}
              >
                <option value="mailing">Mailing</option>
                <option value="work">Work</option>
              </select>
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (errorsAddresses?.[index] as FormikErrors<Address>)
                      ?.addressType
                  }
                  touched={touchedAddresses?.[index]?.addressType}
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
                const updatedAddresses = addressValues.filter(
                  (_, addrIndex) => addrIndex !== index
                );
                formik.setFieldValue(
                  isKycFormValues(formik.values)
                    ? `personalInfo.address`
                    : `address`,
                  updatedAddresses
                );
              }}
            >
              Delete Address
            </button>
          )}
        </div>
      ))}

      {/* Add Address Button */}
      <button
        type="button"
        className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
        onClick={() => {
          const newAddress = {
            country: "",
            city: "",
            street: "",
            postalCode: "",
            addressType: "mailing",
          };
          formik.setFieldValue(
            isKycFormValues(formik.values) ? `personalInfo.address` : `address`,
            [...addressValues, newAddress]
          );
        }}
        hidden={isOfficer}
      >
        Add Address
      </button>
    </div>
  );
}

export default AddressesPanel;
