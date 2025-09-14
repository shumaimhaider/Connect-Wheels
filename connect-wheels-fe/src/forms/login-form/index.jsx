import { Formik, Form } from "formik";

import { LoginFormFields } from "./login-fields";
import { schema } from "../../validations";
import { callApi } from "../../redux/slices/apiSlice";
import { useDispatch } from "react-redux";

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


  console.log("res login", res)

  if (res.meta.requestStatus === "fulfilled") {
    console.log("Login successful:", res.payload);
    resetForm();
    // 👉 you can also save token to localStorage here if needed
    // localStorage.setItem("token", res.payload.token);
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
