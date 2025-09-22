import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={2} // ← Increased elevation for subtle shadow
      sx={{
        backgroundColor: "white",
        borderBottom: 1,
        borderColor: "grey.200",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)", // ← Subtle gradient
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Logo/Brand */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DirectionsCarIcon sx={{ color: "primary.main", fontSize: 32 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 700,
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              Connect Wheels
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ color: "text.primary", fontWeight: 500 }}
                >
                  Welcome, {user?.firstName || user?.email}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="text"
                  sx={{
                    color: "text.primary",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "grey.50",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    px: 3,
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
