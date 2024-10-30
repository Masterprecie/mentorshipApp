import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logout, setCredentials } from "./auth/slice";

// Base query with custom headers and token handling
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,

  prepareHeaders: (headers, { getState }) => {
    // Add token if available
    const userData = JSON.parse(localStorage.getItem("@me2mentor_user"));
    const token = getState().auth.accessToken || userData?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Wrapper for the baseQuery to handle refresh token logic
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  // First request using the base query
  let result = await baseQuery(args, api, extraOptions);

  // If the request fails with a 401 Unauthorized error
  if (result?.error?.status === 401) {
    console.log("Access token expired, attempting to refresh...");

    // Try to refresh the token using the refresh token
    const userData = JSON.parse(localStorage.getItem("@me2mentor_user"));
    const refreshToken = userData?.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh", // Your refresh token endpoint
          method: "POST",
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions
      );


      if (refreshResult?.data) {
        // If refresh is successful, store new tokens
        const newAccessToken = refreshResult.data.accessToken;
        const updatedUserData = {
          ...userData, // Keep all other user info intact
          accessToken: newAccessToken,
        };
        localStorage.setItem(
          "@me2mentor_user",
          JSON.stringify(updatedUserData)
        );

        console.log(updatedUserData);
        // Update Redux store with new tokens
        api.dispatch(
          setCredentials({
            ...updatedUserData,
          })
        );

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, log the user out
        api.dispatch(logout());
      }
    } else {
      // If no refresh token exists, log the user out
      api.dispatch(logout());
    }
  }

  return result;
};
