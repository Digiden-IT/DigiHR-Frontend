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
    getAllLeaveOptions: builder.query<any, void>({
      query: () => ({
        url: "leaves/filter-options",
        method: "GET",
      }),
      providesTags: ["allLeaveOptions"],
    }),
  }),
});

export const { useGetLeaveSummaryQuery, useAddLeaveRequestMutation, useGetAllLeaveOptionsQuery } =
  userLeaveScheduleApi;
