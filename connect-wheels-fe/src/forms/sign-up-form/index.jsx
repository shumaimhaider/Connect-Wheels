import { Form, Formik } from "formik";
import { SignupFormFields } from "./sign-up-fields";
import { SignupSchema } from "../../validations";
import { useRegisterUserMutation } from "../../redux/slices/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupForm = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await registerUser(values).unwrap();
      resetForm();
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Registration failed";
      toast.error(errorMessage);
    }
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
