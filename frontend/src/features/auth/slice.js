import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  is_authenticated: null,
  last_route: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      { payload: { user, accessToken, refreshToken, is_authenticated } }
    ) {
      const lastRoute = localStorage.getItem("@me2mentor_last_route") || null;
      localStorage.setItem(
        "@me2mentor_user",
        JSON.stringify({ user, accessToken, refreshToken, is_authenticated })
      );
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.is_authenticated = is_authenticated;
      state.last_route = lastRoute;
    },
    setLastRoute: (state, { payload }) => {
      state.last_route = payload;
      // localStorage.setItem("@me2mentor_last_route", payload);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.is_authenticated = null;
      localStorage.removeItem("@me2mentor_user");
      window.location.href = "/login";
      // localStorage.removeItem("@tredah_last_route");
    },
  },
});

export const { setCredentials, logout, setLastRoute } = authSlice.actions;
export default authSlice.reducer;
