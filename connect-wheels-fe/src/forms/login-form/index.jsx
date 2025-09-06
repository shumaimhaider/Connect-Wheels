import { Formik, Form } from "formik";

import { LoginFormFields } from "./login-fields";
import { schema } from "../../validations";

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => {
        alert(JSON.stringify(values));
      }}
    >
      <Form>
        <LoginFormFields />
      </Form>
    </Formik>
  );
};
