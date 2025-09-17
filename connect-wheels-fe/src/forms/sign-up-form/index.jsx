import { Form, Formik } from "formik";
import { SignupFormFields } from "./sign-up-fields";
import { SignupSchema } from "../../validations";
import { useDispatch } from "react-redux";
import { callApi } from "../../redux/slices/apiSlice";
import { toast } from "react-toastify"; // ← ADD THIS IMPORT
import { useNavigate } from "react-router-dom"; // ← ADD THIS IMPORT
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerUser =
  (values, resetForm, navigate) => async (dispatch) => {
    const res = await dispatch(
      callApi({
        url: "/auth/register",
        method: "post",
        data: values,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      resetForm();
      navigate("/dashboard");
    } else {
      toast.error("Error Registering User");
    }
  };

export const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(registerUser(values, resetForm, navigate));
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
