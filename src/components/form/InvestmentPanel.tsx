import React from "react";
import { FormikProps } from "formik";
import styles from "../../assets/css/Form.module.css";
import {
  KycFormValues,
  Experience,
  Risk,
} from "../../services/types/KycFormValues";

interface InvestmentPanelProps {
  formik: FormikProps<KycFormValues>;
  userEditInfo: KycFormValues | undefined;
  isOfficer: boolean;
}

function InvestmentPanel({
  formik,
  userEditInfo,
  isOfficer,
}: InvestmentPanelProps) {
  const { getFieldProps, setFieldValue } = formik;

  // Default to fallback values to avoid undefined errors
  const investment = formik.values.kycInfo?.investment || {
    experience: Experience.LessThan5Years,
    risk: Risk.TenPercent,
  };

  const userInvestment = userEditInfo?.kycInfo?.investment || {
    experience: Experience.LessThan5Years,
    risk: Risk.TenPercent,
  };

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Investment Experience and Objectives
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Investment Experience */}
        <div>
          <label
            htmlFor="investment-experience"
            className="block text-sm font-medium"
          >
            Experience in Financial Markets
          </label>
          <select
            id="investment-experience"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            {...getFieldProps("kycInfo.investment.experience")}
            value={
              isOfficer
                ? userInvestment.experience || Experience.LessThan5Years
                : investment.experience
            }
            disabled={isOfficer}
            onChange={(e) => {
              setFieldValue("kycInfo.investment.experience", e.target.value);
            }}
          >
            <option value={Experience.LessThan5Years}>{"< 5 years"}</option>
            <option value={Experience.Between5And10Years}>
              {"> 5 and < 10 years"}
            </option>
            <option value={Experience.MoreThan10Years}>{"> 10 years"}</option>
          </select>
        </div>

        {/* Risk Tolerance */}
        <div>
          <label htmlFor="risk-tolerance" className="block text-sm font-medium">
            Risk Tolerance
          </label>
          <select
            id="risk-tolerance"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
            {...getFieldProps("kycInfo.investment.risk")}
            value={
              isOfficer
                ? userInvestment.risk || Risk.TenPercent
                : investment.risk
            }
            disabled={isOfficer}
            onChange={(e) => {
              setFieldValue("kycInfo.investment.risk", e.target.value);
            }}
          >
            <option value={Risk.TenPercent}>10%</option>
            <option value={Risk.ThirtyPercent}>30%</option>
            <option value={Risk.AllIn}>All-in</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default InvestmentPanel;
