import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ProtectedRoute from "./routes/protected-route";
import PublicRoute from "./routes/public-route";
import Layout from "./components/layout";
import LoginPage from "./pages/auth-pages/login-page";
import SignupPage from "./pages/auth-pages/sign-up-page";
import NotFoundPage from "./pages/not-found";
import DashboardPage from "./pages/dashboard";
// Garage pages
import GarageListPage from "./pages/garage-pages/garage-list";
import GarageDetailsPage from "./pages/garage-pages/garage-details";
import GarageCreatePage from "./pages/garage-pages/garage-create";
import GarageEditPage from "./pages/garage-pages/garage-edit";
import MyGaragesPage from "./pages/garage-pages/my-garages";
// Car pages
import CarListPage from "./pages/car-pages/car-list";
import CarDetailsPage from "./pages/car-pages/car-details";
import CarCreatePage from "./pages/car-pages/car-create";
import CarEditPage from "./pages/car-pages/car-edit";
// User interaction pages
import FollowedGaragesPage from "./pages/user-pages/followed-garages";
import FollowersPage from "./pages/user-pages/followers";
import FollowingPage from "./pages/user-pages/following";
import NotificationsPage from "./pages/user-pages/notifications";
import UserGaragesPage from "./pages/user-pages/user-garages";
import UserSearchPage from "./pages/user-pages/user-search";
// Settings pages
import ProfileSettingsPage from "./pages/settings-pages/profile-settings";
import PreferencesPage from "./pages/settings-pages/preferences";

// Custom MUI Theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1A237E", // Deep Blue / Navy
      light: "#E3F2FD", // Light Blue for selected states
      dark: "#121858",
    },
    secondary: {
      main: "#00B8D4", // Electric Teal
    },
    background: {
      default: "#F5F5F7",
      paper: "#ffffff",
    },
    text: {
      primary: "#1d1d1f",
      secondary: "#86868b",
    },
    warning: {
      main: "#FF6D00", // Orange accent
    },
    success: {
      main: "#AEEA00", // Lime accent
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 700, color: "#1A237E" },
    h2: { fontWeight: 700, color: "#1A237E" },
    h3: { fontWeight: 700, color: "#1A237E" },
    h4: { fontWeight: 700, color: "#1A237E" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
        },
        containedPrimary: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(26, 35, 126, 0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        },
      },
    },
  },
});

// Route configuration
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/garages" replace />,
      },
      // Garage routes
      {
        path: "garages",
        element: <GarageListPage />,
      },
      {
        path: "garages/create",
        element: <GarageCreatePage />,
      },
      {
        path: "garages/:id",
        element: <GarageDetailsPage />,
      },
      {
        path: "garages/:id/edit",
        element: <GarageEditPage />,
      },
      {
        path: "garages/my",
        element: <MyGaragesPage />,
      },
      // Car routes
      {
        path: "cars",
        element: <CarListPage />,
      },
      {
        path: "cars/create",
        element: <CarCreatePage />,
      },
      {
        path: "cars/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "cars/:id/edit",
        element: <CarEditPage />,
      },
      // User interaction routes
      {
        path: "followed-garages",
        element: <FollowedGaragesPage />,
      },
      {
        path: "followers",
        element: <FollowersPage />,
      },
      {
        path: "following",
        element: <FollowingPage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "users/:userId/garages",
        element: <UserGaragesPage />,
      },
      {
        path: "users/search",
        element: <UserSearchPage />,
      },
      // Settings routes
      {
        path: "settings/profile",
        element: <ProfileSettingsPage />,
      },
      {
        path: "settings/preferences",
        element: <PreferencesPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// App component - clean and simple
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastContainer theme="dark" />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
