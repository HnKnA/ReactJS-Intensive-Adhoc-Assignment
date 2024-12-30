import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .min(8, "Email must be at least 8 characters")
    .max(30, "Email must not exceed 30 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters")
    .max(16, "Password must not exceed 16 characters")
    .matches(
      /^[a-zA-Z0-9@#&!]+$/,
      "Password must contain only letters, numbers, and special characters (@, #, &, !)"
    )
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@#&!]/,
      "Password must contain at least one special character (@, #, &, !)"
    ),
});
