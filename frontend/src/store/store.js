import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import { authApi } from "../features/auth/api";
import { usersApi } from "../features/users/api";
import { adminApi } from "../features/admin/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      adminApi.middleware
    ),
});
