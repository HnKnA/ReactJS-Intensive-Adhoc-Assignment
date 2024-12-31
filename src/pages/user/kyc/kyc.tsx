import React, { useContext, useEffect } from "react";
import { useFormik, FormikProvider } from "formik";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  AddressType,
  EmailType,
  IdType,
  OccupationName,
  PhoneType,
} from "../../../services/types/EditInfoFormValues";
import {
  AssetType,
  Experience,
  IncomeType,
  KycFormValues,
  LiabilityType,
  Risk,
  SourceOfWealthType,
} from "../../../services/types/KycFormValues";
import useOfficerMode from "../../../hooks/useOfficerMode";
import { AuthenticatedContext } from "../../../shared/Authenticated";
import {
  useGetUserKycInformationQuery,
  useUpdateUserKycInformationMutation,
} from "../../../services/apis/user";
import { kycValidationSchema } from "../../../assets/validation/kycValidationSchema";
import BasicInformation from "../../../components/form/BasicInformation";
import AddressesPanel from "../../../components/form/AddressesPanel";
import EmailsPanel from "../../../components/form/EmailsPanel";
import PhonesPanel from "../../../components/form/PhonesPanel";
import IdentificationsPanel from "../../../components/form/IdentificationsPanel";
import OccupationsPanel from "../../../components/form/OccupationsPanel";
import Spinner from "../../../components/spinner/spinner";
import styles from "../../../assets/css/Form.module.css";
import IncomesPanel from "../../../components/form/IncomesPanel";
import AssetsPanel from "../../../components/form/AssetsPanel";
import LiabilitiesPanel from "../../../components/form/LiabilitiesPanel";
import SourceOfWealthsPanel from "../../../components/form/SourceOfWealthsPanel";
import NetWorthPanel from "../../../components/form/NetWorthPanel";
import InvestmentPanel from "../../../components/form/InvestmentPanel";

const UserKYC = () => {
  const {
    data: userKycInfo,
    isError: getUserKycInfoError,
    isLoading: getUserKycInfoLoading,
  } = useGetUserKycInformationQuery();
  const [updateUserKycInformation, { isLoading: isUpdating }] =
    useUpdateUserKycInformationMutation();
  const { isOfficer } = useOfficerMode();
  const navigate = useNavigate();
  const { user } = useContext(AuthenticatedContext);

  const formik = useFormik<KycFormValues>({
    initialValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        middleName: "",
        dob: null,
        age: 0,
        address: [
          {
            country: "",
            city: "",
            street: "",
            postalCode: "",
            addressType: AddressType.Mailing,
          },
        ],
        email: [
          {
            emailAddress: "",
            emailType: EmailType.Personal,
            emailPreferred: true,
          },
        ],
        phone: [
          {
            phoneNumber: "",
            phoneType: PhoneType.Personal,
            phonePreferred: true,
          },
        ],
        identification: [
          {
            idType: IdType.NationalId,
            idExpired: null,
            idFile: new File([""], "placeholder.pdf"),
          },
        ],
        occupation: [
          {
            occupation: OccupationName.Unemployed,
            occupationFrom: null,
            occupationTo: null,
          },
        ],
      },
      kycInfo: {
        income: [
          {
            incomeType: IncomeType.Salary,
            incomeAmount: null,
          },
        ],
        assets: [
          {
            assetType: AssetType.RealEstate,
            assetAmount: null,
          },
        ],
        liabilities: [
          {
            liabilityType: LiabilityType.PersonalLoan,
            liabilityAmount: null,
          },
        ],
        sourceOfWealth: [
          {
            sourceOfWealthType: SourceOfWealthType.Inheritance,
            sourceOfWealthAmount: null,
          },
        ],
        investment: {
          experience: Experience.LessThan5Years,
          risk: Risk.TenPercent,
        },
      },
    },
    validationSchema: kycValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateUserKycInformation(values).unwrap();
        if (response.message === "success-action") {
          toast.success("KYC information updated successfully!");
          navigate(`../${user?.name}/pi`);
        } else {
          toast.error("Failed to update KYC information.");
        }
      } catch (error) {
        console.error("Error updating KYC information:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  // console.log(formik.errors);

  useEffect(() => {
    if (getUserKycInfoError) {
      alert("Something went wrong! Unable to fetch user information.");
    }
  }, [getUserKycInfoError]);

  if (getUserKycInfoLoading) {
    return <Spinner />;
  }

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2
            className="text-2xl font-bold text-center mb-6"
            style={{ color: "var(--primary-color)" }}
          ></h2>

          {/* Personal Information Section */}
          <div className={`mb-6`}>
            <h3
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: "var(--primary-color)" }}
            >
              Personal Information
            </h3>
            <BasicInformation
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <AddressesPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <EmailsPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <PhonesPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <IdentificationsPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <OccupationsPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
          </div>

          {/* Financial Status Section */}
          <div className={`mb-6`}>
            <h3
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: "var(--primary-color)" }}
            >
              Financial Status
            </h3>
            <IncomesPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <AssetsPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <LiabilitiesPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <SourceOfWealthsPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <NetWorthPanel
              formikValues={formik.values}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
            <InvestmentPanel
              formik={formik}
              userEditInfo={userKycInfo}
              isOfficer={isOfficer}
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              className={`${styles["btn-primary"]} px-6 py-3 rounded-md mr-2 ${
                isOfficer ? "hidden" : "cursor-pointer"
              }`}
              type="button"
              onClick={() => navigate(`/pages/user/${user?.name}/pi`)}
            >
              Personal Information
            </button>
            <button
              type="submit"
              className={`${styles["btn-primary"]} px-6 py-3 rounded-md`}
              disabled={isUpdating}
              hidden={isOfficer}
            >
              {isUpdating ? "Submitting..." : "Submit"}
            </button>

            {isOfficer && (
              <a href={`./pi`} className="underline text-blue-600">
                To user's personal information page
              </a>
            )}
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default UserKYC;
