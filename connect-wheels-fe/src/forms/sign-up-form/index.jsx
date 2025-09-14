import { Form, Formik } from "formik";
import { SignupFormFields } from "./sign-up-fields";
import { SignupSchema } from "../../validations";
import { useDispatch } from "react-redux";
import { callApi } from "../../redux/slices/apiSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerUser = (values, resetForm) => async (dispatch) => {
  const res = await dispatch(
    callApi({
      url: "/auth/register",
      method: "post",
      data: values,
    })
  );

  console.log("res sign up", res)

  if (res.meta.requestStatus === "fulfilled") {
    resetForm();
  } else {
    toast.error("Error Registering User");
  }
};

export const SignupForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(registerUser(values, resetForm));
  };

  return (
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <SignupFormFields />
        </Form>
      </Formik>
  
  );
};
