import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import { authApi } from "../features/auth/api";
import { mentorsApi } from "../features/mentors/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [mentorsApi.reducerPath]: mentorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, mentorsApi.middleware),
});
