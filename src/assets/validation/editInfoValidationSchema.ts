import * as Yup from "yup";
import {
  AddressType,
  EmailType,
  IdType,
  OccupationName,
  PhoneType,
} from "../../services/types/EditInfoFormValues";

export const editInfoValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "DOB cannot be in the future")
    .typeError("Please enter a valid date"),
  age: Yup.number()
    .typeError("Age must be a valid number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),

  address: Yup.array()
    .of(
      Yup.object({
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        street: Yup.string().required("Street is required"),
        postalCode: Yup.string(),
        addressType: Yup.mixed<AddressType>()
          .required("Address type is required")
          .oneOf(Object.values(AddressType)),
      })
    )
    .min(1, "At least one address is required")
    .required("Address is required"),

  email: Yup.array()
    .of(
      Yup.object({
        emailAddress: Yup.string()
          .required("Email address is required")
          .email("Invalid email address"),
        emailType: Yup.mixed<EmailType>()
          .required("Email type is required")
          .oneOf(Object.values(EmailType)),
        emailPreferred: Yup.boolean()
          .required("Email preferred is required")
          .typeError("Email preferred must be true or false"),
      })
    )
    .min(1, "At least one email is required")
    .required("Email is required"),

  phone: Yup.array()
    .of(
      Yup.object({
        phoneNumber: Yup.string().required("Phone number is required"),
        phoneType: Yup.mixed<PhoneType>()
          .required("Phone type is required")
          .oneOf(Object.values(PhoneType)),
        phonePreferred: Yup.boolean()
          .required("Phone preferred is required")
          .typeError("Phone preferred must be true or false"),
      })
    )
    .min(1, "At least one phone address is required")
    .required("Phone is required"),

  identification: Yup.array()
    .of(
      Yup.object({
        idType: Yup.mixed<IdType>()
          .required("Id type is required")
          .oneOf(Object.values(IdType)),
        idExpired: Yup.date()
          .required("Id expiry date is required")
          .min(new Date(), "Expiry date cannot be earlier than today")
          .max(
            new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
            "Id Expiry Date cannot be more than 10 years from today"
          )
          .typeError("Please enter a valid date"),
        idFile: Yup.mixed()
          .required("ID File is required")
          .test(
            "fileType",
            "Only image or PDF files are allowed",
            (value) =>
              value === null ||
              (value instanceof File &&
                ["image/jpeg", "image/png", "application/pdf"].includes(
                  value.type
                ))
          )
          .test(
            "fileSize",
            "File size must be less than 5MB",
            (value) =>
              value === null ||
              (value instanceof File && value.size <= 5 * 1024 * 1024)
          ), // Ensures file size is less than 5MB
      })
    )
    .min(1, "At least one identification is required")
    .required("Identification is required"),

  occupation: Yup.array()
    .of(
      Yup.object({
        occupation: Yup.mixed<OccupationName>()
          .required("Occupation is required")
          .oneOf(Object.values(OccupationName)),
        occupationFrom: Yup.date()
          .required("Start date is required")
          .typeError("Please enter a valid start date"),
        occupationTo: Yup.date()
          .nullable()
          .typeError("Please enter a valid end date")
          .min(
            Yup.ref("occupationFrom"),
            "End date must be greater than or equal to start date"
          ), // Ensures it's greater than the start date
      })
    )
    .notRequired(),
});