import React, { useMemo } from "react";
import styles from "../../assets/css/Form.module.css";
import {
  KycFormValues,
  Income,
  Asset,
  Liability,
  SourceOfWealth,
  Investment,
  Experience,
  Risk,
} from "../../services/types/KycFormValues";

interface NetWorthPanelProps {
  formikValues: KycFormValues;
  userEditInfo: KycFormValues | undefined;
  isOfficer: boolean;
}

const NetWorthPanel = ({
  formikValues,
  userEditInfo,
  isOfficer,
}: NetWorthPanelProps) => {
  // Define the default structure for kycInfo with explicit typing
  const defaultKycInfo: KycFormValues["kycInfo"] = {
    income: [] as Income[],
    assets: [] as Asset[],
    liabilities: [] as Liability[],
    sourceOfWealth: [] as SourceOfWealth[],
    investment: {
      experience: Experience.LessThan5Years,
      risk: Risk.TenPercent,
    } as Investment,
  };

  const kycInfo = isOfficer
    ? userEditInfo?.kycInfo || defaultKycInfo
    : formikValues.kycInfo || defaultKycInfo;

  // Calculate net worth dynamically using useMemo
  const netWorth = useMemo(() => {
    const totalIncome = kycInfo.income.reduce(
      (sum, { incomeAmount }) => sum + (incomeAmount || 0),
      0
    );

    const totalAssets = kycInfo.assets.reduce(
      (sum, { assetAmount }) => sum + (assetAmount || 0),
      0
    );

    const totalLiabilities = kycInfo.liabilities.reduce(
      (sum, { liabilityAmount }) => sum + (liabilityAmount || 0),
      0
    );

    const totalWealth = kycInfo.sourceOfWealth.reduce(
      (sum, { sourceOfWealthAmount }) => sum + (sourceOfWealthAmount || 0),
      0
    );

    // Subtract liabilities from the sum of income, assets, and wealth
    return totalIncome + totalAssets + totalWealth + totalLiabilities;
  }, [kycInfo]);

  return (
    <div className={`${styles.panel} mb-6`}>
      <h3
        className="text-lg font-medium mb-4"
        style={{ color: "var(--primary-color)" }}
      >
        Net Worth
      </h3>
      <div>
        <label htmlFor="net-worth-total" className="block text-sm font-medium">
          Total
        </label>
        <input
          type="number"
          id="net-worth-total"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
          placeholder="Automatically calculated"
          value={netWorth}
          readOnly
        />
      </div>
    </div>
  );
};

export default NetWorthPanel;
