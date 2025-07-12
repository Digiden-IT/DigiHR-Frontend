import { baseApi } from "./baseApi";

const leaveCountSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaveCount: builder.query({
      query: () => {
        return {
          url: "/setting/leave-count",
          method: "GET",
          providesTags: ["allLeaveCount"],
        };
      },
    }),
    leaveCountSetting: builder.mutation({
      query: (data) => ({
        url: "/setting/leave-count",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allLeaveCount"],
    }),
  }),
});

export const { useLeaveCountSettingMutation, useGetAllLeaveCountQuery } =
  leaveCountSettingsApi;
