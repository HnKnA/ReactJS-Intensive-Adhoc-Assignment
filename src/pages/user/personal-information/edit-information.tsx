import React, { useContext, useEffect } from "react";
import { useFormik, FormikProvider, FormikErrors } from "formik";
import { toast } from "react-toastify";
import styles from "../../../assets/css/Form.module.css";
import DateChoosing from "../../../components/datetime/DateChoosing";
import { editInfoValidationSchema } from "../../../assets/validation/editInfoValidationSchema";
import FormErrorMessage from "../../../components/form/FormErrorMessage";
import {
  EditInfoFormValues,
  Address,
  AddressType,
  EmailType,
  Email,
  PhoneType,
  Phone,
  IdType,
  Identification,
  Occupation,
  OccupationName,
} from "../../../services/types/EditInfoFormValues";
import { useNavigate } from "react-router";
import { AuthenticatedContext } from "../../../shared/Authenticated";
import {
  useGetUserEditInformationQuery,
  useUpdateUserEditInformationMutation,
} from "../../../services/apis/user";
import useOfficerMode from "../../../hooks/useOfficerMode";
import Spinner from "../../../components/spinner/spinner";

const EditInformation = () => {
  const {
    data: userEditInfo,
    isError: getUserEditInfoError,
    isLoading: getUserEditInfoLoading,
  } = useGetUserEditInformationQuery();
  const [updateUserEditInformation, { isLoading: isUpdating }] =
    useUpdateUserEditInformationMutation();
  const { isOfficer } = useOfficerMode();
  const navigate = useNavigate();
  const { user } = useContext(AuthenticatedContext);
  const formik = useFormik<EditInfoFormValues>({
    initialValues: {
      /* BASIC INFO */
      firstName: "",
      lastName: "",
      middleName: "",
      dob: null,
      age: 0,

      /* ADDRESS */
      address: [
        {
          country: "",
          city: "",
          street: "",
          postalCode: "",
          addressType: AddressType.Mailing,
        },
      ],

      /* EMAIL */
      email: [
        {
          emailAddress: "",
          emailType: EmailType.Personal,
          emailPreferred: true,
        },
      ],

      /* PHONE */
      phone: [
        {
          phoneNumber: "",
          phoneType: PhoneType.Personal,
          phonePreferred: true,
        },
      ],

      /* IDENTIFICATION */
      identification: [
        {
          idType: IdType.NationalId,
          idExpired: null,
          idFile: null as File | null,
        },
      ],

      /* OCCUPATION */
      occupation: [
        {
          occupation: OccupationName.Unemployed,
          occupationFrom: null,
          occupationTo: null,
        },
      ],
    },

    // Yup Validation Schema
    validationSchema: editInfoValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        console.log("Submitting form with values:", values);
        const response = await updateUserEditInformation(values).unwrap();
        console.log("API Response:", response);
        if (response.message === "success") {
          toast.success("Information updated successfully!");
          navigate(`../${user?.name}/pi`);
        } else {
          toast.error("Failed to update information.");
        }
      } catch (error) {
        console.error("Error updating user information:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const { getFieldProps } = formik;

  useEffect(() => {
    if (getUserEditInfoError) {
      alert("Something went wrong! Unable to fetch user information.");
    }
  }, [getUserEditInfoError]);

  if (getUserEditInfoLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl font-bold text-center"
        style={{ color: "var(--primary-color)" }}
      >
        Edit Information
      </h2>

      {/* Use Formik's handleSubmit for the form */}
      <FormikProvider value={formik}>
        <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
          {/* ================== BASIC INFORMATION ================== */}
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
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                  placeholder={
                    isOfficer
                      ? userEditInfo?.firstName
                      : "Enter your first name"
                  }
                  {...getFieldProps("firstName")}
                  readOnly={isOfficer}
                  onFocus={(e) => {
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
                  onFocus={(e) => {
                    if (isOfficer && !formik.values.lastName) {
                      formik.setFieldValue(
                        "lastName",
                        userEditInfo?.lastName || ""
                      );
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
                <label
                  htmlFor="middleName"
                  className="block text-sm font-medium"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                  placeholder={
                    isOfficer
                      ? userEditInfo?.middleName
                      : "Enter your middle name"
                  }
                  readOnly={isOfficer}
                  {...getFieldProps("middleName")}
                  onFocus={(e) => {
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
                      ? `${new Date(userEditInfo.dob).toLocaleDateString(
                          "en-GB"
                        )}`
                      : "DD/MM/YYYY"
                  }
                  onFocus={() => {
                    if (isOfficer && !formik.values.dob) {
                      const dobAsDate =
                        userEditInfo?.dob &&
                        !isNaN(new Date(userEditInfo.dob).getTime())
                          ? new Date(userEditInfo.dob) // Convert to Date object
                          : null;

                      formik.setFieldValue("dob", dobAsDate); // Set as Date object for compatibility with DatePicker
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

          {/* ================== CONTACT INFORMATION ================== */}
          <div className={`border ${styles.panel} rounded-md p-4`}>
            <h3
              className="text-lg font-medium mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              Contact Information
            </h3>

            {/* --------------- Addresses Panel --------------- */}
            <div className={`${styles.panel} mb-6`}>
              <h4 className="text-md font-semibold mb-4">Addresses</h4>
              {formik.values.address.map((addr, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
                >
                  <h5 className="text-lg font-medium mb-4">
                    Address {index + 1}
                  </h5>
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
                            ? userEditInfo?.address[index]?.country || "N/A"
                            : "Enter country"
                        }
                        readOnly={isOfficer}
                        onFocus={(e) => {
                          if (
                            isOfficer &&
                            !formik.values.address[index]?.country
                          ) {
                            formik.setFieldValue(
                              `address[${index}].country`,
                              userEditInfo?.address[index]?.country || ""
                            );
                          }
                        }}
                        {...getFieldProps(`address[${index}].country`)}
                      />
                      {!isOfficer && (
                        <FormErrorMessage
                          error={
                            (
                              formik.errors.address?.[
                                index
                              ] as FormikErrors<Address>
                            )?.country
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
                            ? userEditInfo?.address[index]?.city || "N/A"
                            : "Enter city"
                        }
                        readOnly={isOfficer}
                        onFocus={(e) => {
                          if (
                            isOfficer &&
                            !formik.values.address[index]?.city
                          ) {
                            formik.setFieldValue(
                              `address[${index}].city`,
                              userEditInfo?.address[index]?.city || ""
                            );
                          }
                        }}
                        {...getFieldProps(`address[${index}].city`)}
                      />
                      {!isOfficer && (
                        <FormErrorMessage
                          error={
                            (
                              formik.errors.address?.[
                                index
                              ] as FormikErrors<Address>
                            )?.city
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
                            ? userEditInfo?.address[index]?.street || "N/A"
                            : "Enter street"
                        }
                        readOnly={isOfficer}
                        onFocus={(e) => {
                          if (
                            isOfficer &&
                            !formik.values.address[index]?.street
                          ) {
                            formik.setFieldValue(
                              `address[${index}].street`,
                              userEditInfo?.address[index]?.street || ""
                            );
                          }
                        }}
                        {...getFieldProps(`address[${index}].street`)}
                      />
                      {!isOfficer && (
                        <FormErrorMessage
                          error={
                            (
                              formik.errors.address?.[
                                index
                              ] as FormikErrors<Address>
                            )?.street
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
                            ? userEditInfo?.address[index]?.postalCode || "N/A"
                            : "Enter postal code"
                        }
                        readOnly={isOfficer}
                        onFocus={(e) => {
                          if (
                            isOfficer &&
                            !formik.values.address[index]?.postalCode
                          ) {
                            formik.setFieldValue(
                              `address[${index}].postalCode`,
                              userEditInfo?.address[index]?.postalCode || ""
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
                            ? userEditInfo?.address[index]?.addressType ||
                              "mailing"
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
                            (
                              formik.errors.address?.[
                                index
                              ] as FormikErrors<Address>
                            )?.addressType
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
                      className=" text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm"
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
                      addressType: AddressType.Mailing,
                    },
                  ]);
                }}
                hidden={isOfficer}
              >
                Add Address
              </button>
            </div>

            {/* --------------- Emails Panel --------------- */}
            <div className={`${styles.panel} mb-6`}>
              <h4 className="text-md font-semibold mb-4">Emails</h4>
              {formik.values.email.map((eml, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
                >
                  <h5 className="text-lg font-medium mb-4">
                    Email {index + 1}
                  </h5>
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
                            ? userEditInfo?.email[index]?.emailAddress || "N/A"
                            : "Enter email address"
                        }
                        readOnly={isOfficer}
                        onFocus={(e) => {
                          if (
                            isOfficer &&
                            !formik.values.email[index]?.emailAddress
                          ) {
                            formik.setFieldValue(
                              `email[${index}].emailAddress`,
                              userEditInfo?.email[index]?.emailAddress || ""
                            );
                          }
                        }}
                        {...getFieldProps(`email[${index}].emailAddress`)}
                      />
                      {!isOfficer && (
                        <FormErrorMessage
                          error={
                            (
                              formik.errors.email?.[
                                index
                              ] as FormikErrors<Email>
                            )?.emailAddress
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
                            ? userEditInfo?.email[index]?.emailType ||
                              "personal"
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
                            ? userEditInfo?.email[
                                index
                              ]?.emailPreferred?.toString() || "false"
                            : formik.values.email[
                                index
                              ].emailPreferred.toString()
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
                      className=" text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm"
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
                      emailType: EmailType.Personal,
                      emailPreferred: true,
                    },
                  ]);
                }}
                hidden={isOfficer}
              >
                Add Email
              </button>
            </div>

            {/* --------------- Phones Panel --------------- */}
            <div className={`${styles.panel} mb-6`}>
              <h4 className="text-md font-semibold mb-4">Phones</h4>
              {formik.values.phone.map((phn, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 mb-6 bg-gray-50 shadow-md"
                >
                  <h5 className="text-lg font-medium mb-4">
                    Phone {index + 1}
                  </h5>
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
                            ? userEditInfo?.phone[index]?.phoneNumber || "N/A"
                            : "Enter phone number"
                        }
                        readOnly={isOfficer}
                        onFocus={(e) => {
                          if (
                            isOfficer &&
                            !formik.values.phone[index]?.phoneNumber
                          ) {
                            formik.setFieldValue(
                              `phone[${index}].phoneNumber`,
                              userEditInfo?.phone[index]?.phoneNumber || ""
                            );
                          }
                        }}
                        {...getFieldProps(`phone[${index}].phoneNumber`)}
                      />
                      {!isOfficer && (
                        <FormErrorMessage
                          error={
                            (
                              formik.errors.phone?.[
                                index
                              ] as FormikErrors<Phone>
                            )?.phoneNumber
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
                            ? userEditInfo?.phone[index]?.phoneType ||
                              "personal"
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
                            ? userEditInfo?.phone[
                                index
                              ]?.phonePreferred?.toString() || "false"
                            : formik.values.phone[
                                index
                              ].phonePreferred.toString()
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
                      className=" text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm"
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
                      phoneAddress: "",
                      phoneType: PhoneType.Personal,
                      phonePreferred: true,
                    },
                  ]);
                }}
                hidden={isOfficer}
              >
                Add Phone
              </button>
            </div>

            {/* ========== IDENTIFICATION DOCUMENTS SECTION ========== */}
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
                            ? userEditInfo?.identification[index]?.idType ||
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
                          touched={
                            formik.touched.identification?.[index]?.idType
                          }
                        />
                      )}
                    </div>

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
                            new Date().setFullYear(
                              new Date().getFullYear() + 10
                            )
                          )
                        } // 10 years from today
                        placeholderText={
                          isOfficer &&
                          userEditInfo?.identification?.[index]?.idExpired
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
                              userEditInfo?.identification?.[index]
                                ?.idExpired &&
                              !isNaN(
                                new Date(
                                  userEditInfo.identification?.[index]
                                    ?.idExpired as unknown as string
                                ).getTime()
                              )
                                ? new Date(
                                    userEditInfo.identification?.[index]
                                      ?.idExpired as unknown as string
                                  ) // Convert to Date object
                                : null;

                            formik.setFieldValue(
                              `identification[${index}].idExpired`,
                              expAsDate
                            ); // Set as Date object for compatibility with DatePicker
                          }
                        }}
                        readOnly={isOfficer}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`identification[${index}].idFile`}
                        className="block text-sm font-medium"
                      >
                        Upload Document
                      </label>
                      {isOfficer ? (
                        // Display file name in officer mode
                        <div className="w-full mt-2 px-4 py-2 border rounded-md bg-gray-100 text-gray-700">
                          {userEditInfo?.identification?.[index]?.idFile
                            ?.name || "No file uploaded"}
                        </div>
                      ) : (
                        // File input for regular users
                        <input
                          type="file"
                          id={`identification[${index}].idFile`}
                          name={`identification[${index}].idFile`}
                          className="w-full mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                          onBlur={formik.handleBlur}
                          onChange={(event) => {
                            // For files, set the File object in Formik
                            formik.setFieldTouched(
                              `identification[${index}].idFile`,
                              true
                            );
                            if (event.currentTarget.files) {
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
                          touched={
                            formik.touched.identification?.[index]?.idFile
                          }
                        />
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  {index > 0 && (
                    <button
                      type="button"
                      className=" text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm"
                      onClick={() => {
                        const updatedIdentifications =
                          formik.values.identification.filter(
                            (_, idfIndex) => idfIndex !== index
                          );
                        formik.setFieldValue(
                          "identification",
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
                  formik.setFieldValue("identification", [
                    ...formik.values.identification,
                    {
                      idType: IdType.NationalId,
                      idExpired: null,
                      idFile: null as File | null,
                    },
                  ]);
                }}
                hidden={isOfficer}
              >
                Add Identification
              </button>
            </div>

            {/* ========== OCCUPATIONS SECTION ========== */}
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
                  <h5 className="text-lg font-medium mb-4">
                    Occupation {index + 1}
                  </h5>

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
                            ? userEditInfo?.occupation[index]?.occupation ||
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
                          touched={
                            formik.touched.occupation?.[index]?.occupation
                          }
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
                          isOfficer &&
                          userEditInfo?.occupation?.[index]?.occupationFrom
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
                              userEditInfo?.occupation?.[index]
                                ?.occupationFrom &&
                              !isNaN(
                                new Date(
                                  userEditInfo.occupation?.[index]
                                    ?.occupationFrom as unknown as string
                                ).getTime()
                              )
                                ? new Date(
                                    userEditInfo.occupation?.[index]
                                      ?.occupationFrom as unknown as string
                                  ) // Convert to Date object
                                : null;

                            formik.setFieldValue(
                              `occupation[${index}].occupationFrom`,
                              ocfAsDate
                            ); // Set as Date object for compatibility with DatePicker
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
                          isOfficer &&
                          userEditInfo?.occupation?.[index]?.occupationTo
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
                                  ) // Convert to Date object
                                : null;

                            formik.setFieldValue(
                              `occupation[${index}].occupationTo`,
                              octAsDate
                            ); // Set as Date object for compatibility with DatePicker
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
                          touched={
                            formik.touched.occupation?.[index]?.occupationTo
                          }
                        />
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  {index > 0 && (
                    <button
                      type="button"
                      className=" text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm"
                      onClick={() => {
                        const updatedOccupations =
                          formik.values.occupation.filter(
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
                      occupation: OccupationName.Unemployed,
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
          </div>

          {/* ================== SUBMIT BUTTON ================== */}
          <div className="text-right">
            <button
              type="submit"
              className={`${styles["btn-primary"]} px-6 py-3 rounded-md`}
              hidden={isOfficer}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <div className="flex items-center space-x-2">
                  <span>Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>

            {isOfficer && (
              <a href={`./pi`} className="underline text-blue-600">
                To user's personal information page
              </a>
            )}
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default EditInformation;
