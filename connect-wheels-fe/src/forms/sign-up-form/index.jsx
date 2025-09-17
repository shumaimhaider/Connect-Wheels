import { Form, Formik } from "formik";
import { SignupFormFields } from "./sign-up-fields";
import { SignupSchema } from "../../validations";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/slices/userSlice"; // ← Import from userSlice

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(registerUser(values))
      .unwrap()
      .then(() => {
        resetForm();
        toast.success("Registration successful! Please login.");
        navigate("/login"); // ← Redirect to login page
      })
      .catch((error) => {
        toast.error("Error Registering User");
      });
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
