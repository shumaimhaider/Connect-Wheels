import { Formik, Form } from "formik";
import { LoginFormFields } from "./login-fields";
import { schema } from "../../validations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { loginUser, clearError } from "../../redux/slices/userSlice"; // ← Import from userSlice

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  // Show toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError()); // Clear error after showing toast
      
    }
  }, [error, dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        resetForm();
        navigate("/dashboard"); // Redirect to dashboard on success
      })
      .catch(() => {
        // Error is already handled by the useEffect above
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <LoginFormFields loading={loading} />
      </Form>
    </Formik>
  );
};
