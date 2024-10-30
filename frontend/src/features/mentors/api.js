import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "..";

export const mentorsApi = createApi({
  reducerPath: "mentorsApi",
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
  }),
});

export const { useGetAllMentorsQuery, useGetMentorByIdQuery } = mentorsApi;
