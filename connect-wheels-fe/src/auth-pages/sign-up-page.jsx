import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { SignupForm } from "../forms/sign-up-form";
import { Link } from "react-router-dom";
import GoogleAuthButton from "../components/google-auth-button";
export default function SignupPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          minHeight: { xs: "auto", md: "80vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          gutterBottom
        >
          Connect Wheels
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Create your account and start your journey
        </Typography>

        {/* Sign Up Form */}
        <SignupForm />

        {/* Divider */}
        <Box sx={{ my: 3, position: "relative" }}>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>
        </Box>

        {/* Google Sign Up */}
        <GoogleAuthButton
          buttonText="Sign up with Google"
          loadingText="Redirecting to Google..."
        />
        {/* Links */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
