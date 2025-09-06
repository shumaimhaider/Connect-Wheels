import { Form, Formik } from "formik";
import { SignupFormFields } from "./sign-up-fields";
import { SignupSchema } from "../../validations";

// Validation schema
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Signup Data:", values);
        setSubmitting(false);
      }}
    >
      <Form>
        <SignupFormFields />
      </Form>
    </Formik>
  );
};
