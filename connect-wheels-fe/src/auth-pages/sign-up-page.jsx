import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { SignupForm } from "../forms/sign-up-form";

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
          Sign up with Google
        </Button>

        {/* Links */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Sign in
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
