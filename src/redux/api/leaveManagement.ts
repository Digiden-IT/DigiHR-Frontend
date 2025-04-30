import { TQueryParam } from "../../types/api.type";
import { baseApi } from "./baseApi";

const leaveManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaves: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/leaves",
          method: "GET",
          params: params,
          providesTags: ["allLeaveManagement"],
        };
      },
    }),
  }),
});

export const { useGetAllLeavesQuery } = leaveManagementApi;
