import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GarageIcon from "@mui/icons-material/Garage";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    { text: "Explore Garages", icon: <GarageIcon />, path: "/garages" },
    { text: "My Garages", icon: <GarageIcon />, path: "/garages/my" },
    { text: "Cars", icon: <DirectionsCarIcon />, path: "/cars" },
    { divider: true },
    { text: "Search Users", icon: <PeopleIcon />, path: "/users/search" },
    { divider: true },
    { text: "Profile Settings", icon: <SettingsIcon />, path: "/settings/profile" },
    { text: "Preferences", icon: <TuneIcon />, path: "/settings/preferences" },
  ];

  const drawer = (
    <Box>
      <Box sx={{ p: 2, textAlign: "center", fontWeight: 700, fontSize: 18 }}>
        Connect Wheels
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) =>
          item.divider ? (
            <Divider key={`divider-${index}`} sx={{ my: 1 }} />
          ) : (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "primary.light",
                    color: "primary.main",
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.light",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? "primary.main" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  if (isMobile) {
    return null; // Hide sidebar on mobile
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: 64, // Height of navbar
          height: "calc(100% - 64px)",
          backgroundColor: "white",
          borderRight: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}