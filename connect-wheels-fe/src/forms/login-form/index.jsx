import { Formik, Form } from "formik";

import { LoginFormFields } from "./login-fields";
import { schema } from "../../validations";
import { callApi } from "../../redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";

const initialValues = {
  email: "",
  password: "",
};

export const loginUser = (values, resetForm) => async (dispatch) => {
  const res = await dispatch(
    callApi({
      url: "/auth/login",
      method: "post",
      data: values,
    })
  );


  if (res.meta.requestStatus === "fulfilled") {
    dispatch(loginSuccess(res.payload)); // Update user state
    resetForm();
  } else {
    console.error("Login failed:", res.payload);
  }
};

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(loginUser(values, resetForm));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <LoginFormFields />
      </Form>
    </Formik>
  );
};
