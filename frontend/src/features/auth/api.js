import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "..";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: `/auth/register`,
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: `/profile`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),

    addExperience: builder.mutation({
      query: (credentials) => ({
        url: `/profile/experience`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),

    editExperience: builder.mutation({
      query: (credentials) => ({
        url: `/profile/experience/${credentials.entryId}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/profile/experience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),

    addEducation: builder.mutation({
      query: (credentials) => ({
        url: `/profile/education`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),

    editEducation: builder.mutation({
      query: (credentials) => ({
        url: `/profile/education/${credentials.entryId}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/profile/education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    forgetPassword: builder.mutation({
      query: (credentials) => ({
        url: `/auth/forget-password`,
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: `/auth/verify-email`,
        method: "POST",
        body: credentials,
      }),
    }),
    resendOtp: builder.mutation({
      query: (credentials) => ({
        url: `/auth/resend-otp`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useUpdateProfileMutation,
  useVerifyEmailMutation,
  useGetProfileQuery,
  useResendOtpMutation,
  useAddExperienceMutation,
  useEditExperienceMutation,
  useDeleteExperienceMutation,
  useAddEducationMutation,
  useEditEducationMutation,
  useDeleteEducationMutation,
} = authApi;
