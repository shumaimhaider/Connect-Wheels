import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import axios from "axios";
// Check if user has token in localStorage (for initial state)
const getInitialState = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  
  let user = null;
  try {
    user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem("user");
    user = null;
  }

  // Only consider authenticated if we have BOTH token and user data
  const isAuthenticated = !!(token && user);
  
  // If we have token but no user (corrupted state), clear it
  if (token && !user) {
    localStorage.removeItem("token");
  }

  return {
    user: user,
    token: token,
    isAuthenticated: isAuthenticated,
    loading: false,
    error: null,
  };
};

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/google");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add this async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// Add login async thunk
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      
      // Handle backend returning 200 with error message
      if (response.data.message && response.data.message.includes('failed')) {
        return rejectWithValue(response.data.message);
      }
      
      if (!response.data.token) {
        return rejectWithValue('Login failed: No authentication token received');
      }
      
      return response.data;
    } catch (err) {
      // Handle actual HTTP errors
      return rejectWithValue(
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        'Login failed'
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      
      const { token, ...userData } = action.payload;
      state.user = userData;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // ← REMOVE USER DATA TOO
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        window.location.href = action.payload.authUrl;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Double-check that we have a token (in case backend returns 200 with error)
        if (!action.payload.token || action.payload.message === 'Login failed') {
          state.loading = false;
          state.error = 'Login failed';
          state.isAuthenticated = false;
          return;
        }
        
        state.loading = false;
        
        const { token, ...userData } = action.payload;
        state.user = userData;
        state.token = token;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  userSlice.actions;
export default userSlice.reducer;
