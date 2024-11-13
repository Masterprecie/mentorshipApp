import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "..";

export const usersApi = createApi({
  reducerPath: "usersApi",
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

    contact: builder.mutation({
      query: (payload) => ({
        url: `/user/contact`,
        method: "POST",
        body: payload,
      }),
    }),
    changeEmailRequest: builder.mutation({
      query: (payload) => ({
        url: `/settings/change-email-request`,
        method: "POST",
        body: payload,
      }),
    }),
    getNotifications: builder.query({
      query: (id) => ({
        url: `/user/notifications/${id}`,
        method: "GET",
      }),
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/user/notifications/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllMentorsQuery,
  useGetMentorByIdQuery,
  useContactMutation,
  useChangeEmailRequestMutation,
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
} = usersApi;
