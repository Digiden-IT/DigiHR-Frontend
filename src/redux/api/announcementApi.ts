import { baseApi } from "./baseApi";

const announcementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // registration api
    addAnnouncements: builder.mutation({
      query: (data) => ({
        url: "/announcements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allannouncements"],
    }),
    // get all user api
    getAllAnnouncements: builder.query({
      query: () => ({
        url: "/announcements?sort=announcementDate,desc",
        method: "GET",
      }),
      providesTags: ["allannouncements"],
    }),
  }),
});

export const { useAddAnnouncementsMutation, useGetAllAnnouncementsQuery } =
  announcementApi;
