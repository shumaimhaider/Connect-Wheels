import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import { garageApi } from "./slices/garageSlice";
import { carApi } from "./slices/carSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [garageApi.reducerPath]: garageApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(garageApi.middleware)
      .concat(carApi.middleware),
});

export default store;