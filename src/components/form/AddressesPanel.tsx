import React from "react";
import { FormikProps, FormikErrors } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../assets/css/Form.module.css";
import {
  EditInfoFormValues,
  Address,
} from "../../services/types/EditInfoFormValues";

interface AddressesPanelProps {
  formik: FormikProps<EditInfoFormValues>;
  userEditInfo: EditInfoFormValues | undefined;
  isOfficer: boolean;
}

function AddressesPanel({
  formik,
  userEditInfo,
  isOfficer,
}: AddressesPanelProps) {
  const { getFieldProps } = formik;

  return (
    <div className={`${styles.panel} mb-6`}>
      <h4 className="text-md font-semibold mb-4">Addresses</h4>
      {formik.values.address.map((addr, index) => (
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
                    ? userEditInfo?.address?.[index]?.country || "N/A"
                    : "Enter country"
                }
                readOnly={isOfficer}
                onFocus={() => {
                  if (isOfficer && !formik.values.address[index]?.country) {
                    formik.setFieldValue(
                      `address[${index}].country`,
                      userEditInfo?.address?.[index]?.country || ""
                    );
                  }
                }}
                {...getFieldProps(`address[${index}].country`)}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (formik.errors.address?.[index] as FormikErrors<Address>)
                      ?.country
                  }
                  touched={formik.touched.address?.[index]?.country}
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
                    ? userEditInfo?.address?.[index]?.city || "N/A"
                    : "Enter city"
                }
                readOnly={isOfficer}
                onFocus={() => {
                  if (isOfficer && !formik.values.address[index]?.city) {
                    formik.setFieldValue(
                      `address[${index}].city`,
                      userEditInfo?.address?.[index]?.city || ""
                    );
                  }
                }}
                {...getFieldProps(`address[${index}].city`)}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (formik.errors.address?.[index] as FormikErrors<Address>)
                      ?.city
                  }
                  touched={formik.touched.address?.[index]?.city}
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
                    ? userEditInfo?.address?.[index]?.street || "N/A"
                    : "Enter street"
                }
                readOnly={isOfficer}
                onFocus={() => {
                  if (isOfficer && !formik.values.address[index]?.street) {
                    formik.setFieldValue(
                      `address[${index}].street`,
                      userEditInfo?.address?.[index]?.street || ""
                    );
                  }
                }}
                {...getFieldProps(`address[${index}].street`)}
              />
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (formik.errors.address?.[index] as FormikErrors<Address>)
                      ?.street
                  }
                  touched={formik.touched.address?.[index]?.street}
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
                    ? userEditInfo?.address?.[index]?.postalCode || "N/A"
                    : "Enter postal code"
                }
                readOnly={isOfficer}
                onFocus={() => {
                  if (isOfficer && !formik.values.address[index]?.postalCode) {
                    formik.setFieldValue(
                      `address[${index}].postalCode`,
                      userEditInfo?.address?.[index]?.postalCode || ""
                    );
                  }
                }}
                {...getFieldProps(`address[${index}].postalCode`)}
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
                {...getFieldProps(`address[${index}].addressType`)}
                value={
                  isOfficer
                    ? userEditInfo?.address?.[index]?.addressType || "mailing"
                    : formik.values.address[index]?.addressType
                }
                disabled={isOfficer}
              >
                <option value="mailing">Mailing</option>
                <option value="work">Work</option>
              </select>
              {!isOfficer && (
                <FormErrorMessage
                  error={
                    (formik.errors.address?.[index] as FormikErrors<Address>)
                      ?.addressType
                  }
                  touched={formik.touched.address?.[index]?.addressType}
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
                const updatedAddresses = formik.values.address.filter(
                  (_, addrIndex) => addrIndex !== index
                );
                formik.setFieldValue("address", updatedAddresses);
              }}
            >
              Delete Address
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className={`${styles["btn-primary"]} px-4 py-2 mt-4 rounded-md`}
        onClick={() => {
          formik.setFieldValue("address", [
            ...formik.values.address,
            {
              country: "",
              city: "",
              street: "",
              postalCode: "",
              addressType: "mailing",
            },
          ]);
        }}
        hidden={isOfficer}
      >
        Add Address
      </button>
    </div>
  );
}

export default AddressesPanel;
