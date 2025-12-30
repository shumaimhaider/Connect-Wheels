import {
  Typography,
  Box,
  Paper,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GarageIcon from "@mui/icons-material/Garage";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import StatCard from "../components/StatCard";
import GarageCard from "../components/GarageCard";
import { mockGarages, mockActivities, mockUsers } from "../data/mock-data";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Get current user's stats (using mock user data)
  const currentUser = mockUsers[0]; // Simulating logged-in user
  const followedGarages = mockGarages.filter((g) => g.isFollowing);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
      <Container maxWidth="xl">
        {/* Welcome Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Welcome back, {user?.firstName || currentUser.firstName}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Here's what's happening with your garages and cars today.
          </Typography>
        </Paper>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={GarageIcon}
              title="My Garages"
              value={currentUser.garagesCount}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={DirectionsCarIcon}
              title="My Cars"
              value={currentUser.carsCount}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={PeopleIcon}
              title="Followers"
              value={currentUser.followersCount}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={NotificationsIcon}
              title="Notifications"
              value={3}
              color="warning"
            />
          </Grid>
        </Grid>

        {/* Quick Access Links */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Quick Actions
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/garages/create")}
            >
              Create Garage
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/cars/create")}
              color="success"
            >
              Add Car
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/garages")}
            >
              Browse Garages
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/cars")}
            >
              Browse Cars
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/notifications")}
            >
              View Notifications
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Followed Garages */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Garages You Follow
                </Typography>
                <Button size="small" onClick={() => navigate("/followed-garages")}>
                  View All
                </Button>
              </Box>
              <Grid container spacing={2}>
                {followedGarages.slice(0, 2).map((garage) => (
                  <Grid item xs={12} sm={6} key={garage.id}>
                    <GarageCard garage={garage} />
                  </Grid>
                ))}
              </Grid>
              {followedGarages.length === 0 && (
                <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                  You're not following any garages yet. Start exploring!
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Recent Activity
              </Typography>
              <List>
                {mockActivities.slice(0, 5).map((activity) => (
                  <ListItem key={activity.id} alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar src={activity.userAvatar} alt={activity.userName} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          {activity.message}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}