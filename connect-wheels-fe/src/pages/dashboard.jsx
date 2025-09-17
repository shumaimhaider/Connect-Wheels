import { Typography, Box, Paper, Button, Container } from "@mui/material"; // Add Container
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // ← Nice gradient background
        py: 3 
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ color: "text.primary", mb: 3 }}>
          Dashboard
        </Typography>

        {/* Show user info if available */}
        {user && (
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
              Welcome, {user.firstName || user.email}!
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Email: {user.email}
            </Typography>
            {user.firstName && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Name: {user.firstName} {user.lastName}
              </Typography>
            )}
          </Paper>
        )}

        {/* Show auth status */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 2, 
            mb: 3,
            background: "white",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Authentication Status
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: isAuthenticated ? "success.main" : "error.main",
              fontWeight: 500 
            }}
          >
            {isAuthenticated ? "✅ Logged In" : "❌ Not Logged In"}
          </Typography>
        </Paper>

        {/* Logout button */}
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleLogout}
          sx={{ borderRadius: 2 }}
        >
          Logout
        </Button>
      </Container>
    </Box>
  );
}