import { baseApi } from "../../api/baseApi";

const userLeaveScheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaveSummary: builder.query({
      query: () => {
        return {
          url: "/leaves/leave-summary",
          method: "GET",
          providesTags: ["allLeaveSchedule"],
        };
      },
    }),
    addLeaveRequest: builder.mutation({
      query: (data) => ({
        url: "/leaves",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allLeaveSchedule"],
    }),
  }),
});

export const { useGetLeaveSummaryQuery, useAddLeaveRequestMutation } =
  userLeaveScheduleApi;
