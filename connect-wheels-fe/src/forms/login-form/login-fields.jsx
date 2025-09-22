import { Field } from "formik";
import { TextField, Box, Button, CircularProgress } from "@mui/material";

export const LoginFormFields = ({ loading }) => {
  return (
    <>
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          mt: 2,
          borderRadius: 2,
          py: 1.5,
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Sign in"
        )}
      </Button>
    </>
  );
};
