import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    user: userReducer,
  },
});

export default store;