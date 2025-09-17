import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { LoginForm } from "../forms/login-form/index";
import { Link } from "react-router-dom";
import GoogleAuthButton from "../components/google-auth-button";
export default function LoginPage() {
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
          p: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
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
          Sign in to continue your journey
        </Typography>

        {/* Form */}

        <LoginForm />

        {/* Divider */}
        <Box sx={{ my: 3, position: "relative" }}>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>
        </Box>

        {/* Social Login */}
        <GoogleAuthButton
          buttonText="Login with Google"
          loadingText="Redirecting to Google..."
        />

        {/* Links */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            <Link
              to="/forgot-password"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Forgot password?
            </Link>{" "}
            ·{" "}
            <Link
              to="/signup"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Create account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
