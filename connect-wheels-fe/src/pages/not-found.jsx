import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: 4,
        }}
      >
        {/* 404 Text */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", sm: "6rem" },
            fontWeight: 700,
            color: "primary.main",
            mb: 1,
          }}
        >
          404
        </Typography>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 2,
          }}
        >
          Page Not Found
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 4,
            maxWidth: 400,
          }}
        >
          Sorry, the page you are looking for doesn't exist or has been moved.
        </Typography>

        {/* Home Button */}
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}