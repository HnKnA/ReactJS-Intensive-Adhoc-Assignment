import { EditInfoFormValues } from "./EditInfoFormValues";

export enum IncomeType {
  Salary = "salary",
  Investment = "investment",
  Others = "others",
}

export interface Income {
  incomeType: IncomeType;
  incomeAmount: number | null;
}

export enum AssetType {
  Bond = "bond",
  Liquidity = "liquidity",
  RealEstate = "real-estate",
  Others = "others",
}

export interface Asset {
  assetType: AssetType;
  assetAmount: number | null;
}

export enum LiabilityType {
  PersonalLoan = "personal-loan",
  RealEstateLoan = "real-estate-loan",
  Others = "others",
}

export interface Liability {
  liabilityType: LiabilityType;
  liabilityAmount: number | null;
}

export enum SourceOfWealthType {
  Inheritance = "inheritance",
  Donation = "donation",
}

export interface SourceOfWealth {
  sourceOfWealthType: SourceOfWealthType;
  sourceOfWealthAmount: number | null;
}

export enum Experience {
  LessThan5Years = "< 5 years",
  Between5And10Years = "> 5 and < 10 years",
  MoreThan10Years = "> 10 years",
}

export enum Risk {
  TenPercent = "10%",
  ThirtyPercent = "30%",
  AllIn = "All-in",
}

export interface Investment {
  experience: Experience;
  risk: Risk;
}

export interface FinancialStatus {
  income: Income[];
  assets: Asset[];
  liabilities: Liability[];
  sourceOfWealth: SourceOfWealth[];
  investment: Investment;
}

export interface KycFormValues {
  personalInfo: EditInfoFormValues;
  kycInfo: FinancialStatus;
}
