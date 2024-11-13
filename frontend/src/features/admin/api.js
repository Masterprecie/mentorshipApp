import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "..";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllMentors: builder.query({
      query: ({ page, limit, search }) => {
        const pageParams = page ? `page=${page}` : "";
        const limitParams = limit ? `limit=${limit}` : "";
        const searchParams = search ? `search=${search}` : "";
        const combinedParams = [pageParams, limitParams, searchParams]
          .filter(Boolean)
          .join("&");
        return {
          url: `/user/mentors?${combinedParams}`,
          method: "GET",
        };
      },
    }),

    getMentorById: builder.query({
      query: (id) => ({
        url: `/user/mentor/${id}`,
        method: "GET",
      }),
    }),

    getAllMentees: builder.query({
      query: ({ page, limit, search }) => {
        const pageParams = page ? `page=${page}` : "";
        const limitParams = limit ? `limit=${limit}` : "";
        const searchParams = search ? `search=${search}` : "";
        const combinedParams = [pageParams, limitParams, searchParams]
          .filter(Boolean)
          .join("&");
        return {
          url: `/admin/mentees?${combinedParams}`,
          method: "GET",
        };
      },
    }),

    getMenteeById: builder.query({
      query: (id) => ({
        url: `/admin/mentee/${id}`,
        method: "GET",
      }),
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: `/admin/stats`,
        method: "GET",
      }),
    }),

    getDashboardAnalytics: builder.query({
      query: (year) => {
        const yearParams = year ? `?year=${year}` : "";
        return {
          url: `/admin/analytics${yearParams}`,
          method: "GET",
        };
      },
    }),

    verifyMentorId: builder.mutation({
      query: (payload) => ({
        url: `/admin/mentor/verifyId`,
        method: "PUT",
        body: payload,
      }),
    }),
    declineMentorId: builder.mutation({
      query: (payload) => ({
        url: `/admin/mentor/declineId`,
        method: "PUT",
        body: payload,
      }),
    }),
    getAllEmailChangeRequest: builder.query({
      query: ({ page, limit }) => {
        const pageParams = page ? `page=${page}` : "";
        const limitParams = limit ? `limit=${limit}` : "";
        const combinedParams = [pageParams, limitParams]
          .filter(Boolean)
          .join("&");
        return {
          url: `/admin/email-change-request?${combinedParams}`,
          method: "GET",
        };
      },
    }),
    getAllContactUsMessage: builder.query({
      query: ({ page, limit }) => {
        const pageParams = page ? `page=${page}` : "";
        const limitParams = limit ? `limit=${limit}` : "";
        const combinedParams = [pageParams, limitParams]
          .filter(Boolean)
          .join("&");
        return {
          url: `/user/contact?${combinedParams}`,
          method: "GET",
        };
      },
    }),
    changeEmaiil: builder.mutation({
      query: (payload) => ({
        url: `/admin/${payload.userId}/change-email`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllMentorsQuery,
  useGetMentorByIdQuery,
  useGetAllMenteesQuery,
  useGetMenteeByIdQuery,
  useVerifyMentorIdMutation,
  useDeclineMentorIdMutation,
  useGetAllContactUsMessageQuery,
  useGetAllEmailChangeRequestQuery,
  useChangeEmaiilMutation,
  useGetDashboardStatsQuery,
  useGetDashboardAnalyticsQuery,
} = adminApi;
