import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state
      const token = getState().user?.token || localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    // Auth endpoints
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    
    loginWithGoogle: builder.query({
      query: () => "/auth/google",
      providesTags: ["Auth"],
    }),
    
    // User endpoints
    getUserProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),
    
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: "/user/profile",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLoginWithGoogleQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = apiSlice;
