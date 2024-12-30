import React, { useContext, useEffect } from "react";
import { useFormik, FormikProvider } from "formik";
import { toast } from "react-toastify";
import styles from "../../../assets/css/Form.module.css";
import { editInfoValidationSchema } from "../../../assets/validation/editInfoValidationSchema";
import {
  EditInfoFormValues,
  AddressType,
  EmailType,
  PhoneType,
  IdType,
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
import BasicInformation from "../../../components/form/BasicInformation";
import AddressesPanel from "../../../components/form/AddressesPanel";
import EmailsPanel from "../../../components/form/EmailsPanel";
import PhonesPanel from "../../../components/form/PhonesPanel";
import IdentificationsPanel from "../../../components/form/IdentificationsPanel";
import OccupationsPanel from "../../../components/form/OccupationsPanel";

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
          <BasicInformation
            formik={formik}
            userEditInfo={userEditInfo}
            isOfficer={isOfficer}
          />

          {/* ================== CONTACT INFORMATION ================== */}
          <div className={`border ${styles.panel} rounded-md p-4`}>
            <h3
              className="text-lg font-medium mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              Contact Information
            </h3>

            {/* --------------- Addresses Panel --------------- */}
            <AddressesPanel
              formik={formik}
              userEditInfo={userEditInfo}
              isOfficer={isOfficer}
            />

            {/* --------------- Emails Panel --------------- */}
            <EmailsPanel
              formik={formik}
              userEditInfo={userEditInfo}
              isOfficer={isOfficer}
            />

            {/* --------------- Phones Panel --------------- */}
            <PhonesPanel
              formik={formik}
              userEditInfo={userEditInfo}
              isOfficer={isOfficer}
            />

            {/* ========== IDENTIFICATION DOCUMENTS SECTION ========== */}
            <IdentificationsPanel
              formik={formik}
              userEditInfo={userEditInfo}
              isOfficer={isOfficer}
            />

            {/* ========== OCCUPATIONS SECTION ========== */}
            <OccupationsPanel
              formik={formik}
              userEditInfo={userEditInfo}
              isOfficer={isOfficer}
            />
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
