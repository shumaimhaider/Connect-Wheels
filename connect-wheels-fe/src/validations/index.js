import * as Yup from "yup";

export const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});


export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(50, "First name must be 50 characters or less"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(50, "Last name must be 50 characters or less"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});