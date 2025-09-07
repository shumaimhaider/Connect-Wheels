import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import {LoginForm} from "../forms/login-form/index";

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
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Continue with Google
        </Button>

        {/* Links */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            <a
              href="/forgot-password"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Forgot password?
            </a>{" "}
            ·{" "}
            <a
              href="/signup"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Create account
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
