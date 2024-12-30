export interface Address {
  country: string;
  city: string;
  street: string;
  postalCode?: string;
  addressType: AddressType;
}

export enum AddressType {
  Mailing = "mailing",
  Work = "work",
}

export interface Email {
  emailAddress: string;
  emailType: EmailType;
  emailPreferred: boolean;
}

export enum EmailType {
  Personal = "personal",
  Work = "work",
}

export interface Phone {
  phoneNumber: string;
  phoneType: PhoneType;
  phonePreferred: boolean;
}

export enum PhoneType {
  Personal = "personal",
  Work = "work",
}

export interface Identification {
  idType: IdType;
  idExpired: Date | null;
  idFile: File | null;
}

export enum IdType {
  Passport = "passport",
  DriverLicense = "driver-license",
  NationalId = "national-id",
}

export interface Occupation {
  occupation: OccupationName;
  occupationFrom: Date | null;
  occupationTo?: Date | null;
}

export enum OccupationName {
  Unemployed = "unemployed",
  Engineer = "engineer",
  Teacher = "teacher",
  Doctor = "doctor",
  Others = "others",
}

export interface EditInfoFormValues {
  firstName: string;
  lastName: string;
  middleName?: string;
  dob: Date | null;
  age: number;
  address: Address[];
  email: Email[];
  phone: Phone[];
  identification: Identification[];
  occupation: Occupation[];
}
