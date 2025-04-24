import { baseApi } from "./baseApi";
import { TQueryParam } from "../../types/api.type";

const announcementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAnnouncements: builder.mutation({
      query: (data) => ({
        url: "/announcements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allannouncements"],
    }),
    getAllAnnouncements: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/announcements",
          method: "GET",
          params: params,
          providesTags: ["allannouncements"],
        };
      },
    }),
    updateAnnouncement: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/announcements/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["allannouncements"],
    }),
    deleteAnnouncement: builder.mutation({
      query: (id) => ({
        url: `/announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allannouncements"],
    }),
    // todo: remove it from here
    leaveCountSetting: builder.mutation({
      query: (data) => ({
        url: "/leavecountsetting",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddAnnouncementsMutation,
  useGetAllAnnouncementsQuery,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useLeaveCountSettingMutation,
} = announcementApi;
