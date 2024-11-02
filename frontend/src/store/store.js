import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import { authApi } from "../features/auth/api";
import { usersApi } from "../features/users/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
});
