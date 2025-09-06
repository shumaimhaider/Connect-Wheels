import { Field, useFormikContext } from "formik";
import { TextField, Box, Button, CircularProgress } from "@mui/material";

export const SignupFormFields = () => {
  const { isSubmitting } = useFormikContext();

  return (
    <>
      {/* First Name */}
      <Box mb={2}>
        <Field name="firstName">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="First Name"
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
            />
          )}
        </Field>
      </Box>

      {/* Last Name */}
      <Box mb={2}>
        <Field name="lastName">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="Last Name"
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
            />
          )}
        </Field>
      </Box>

      {/* Email */}
      <Box mb={2}>
        <Field name="email">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="Email Address"
              type="email"
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
            />
          )}
        </Field>
      </Box>

      {/* Password */}
      <Box mb={2}>
        <Field name="password">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type="password"
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
            />
          )}
        </Field>
      </Box>

      {/* Confirm Password */}
      <Box mb={2}>
        <Field name="confirmPassword">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="Confirm Password"
              type="password"
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
            />
          )}
        </Field>
      </Box>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isSubmitting}
        sx={{
          mt: 2,
          borderRadius: 2,
          py: 1.5,
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Sign Up"
        )}
      </Button>
    </>
  );
};
