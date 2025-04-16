import { baseApi } from "./baseApi";
import { HolidayManagementApiResponse,Pagination } from "../../types/props.type";

const holidayManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHolidays: builder.query<
      HolidayManagementApiResponse,
      Pagination | void
    >({
      query: (params) => {
        // Handle the case where params might be undefined (void)
        const pagination: Pagination = params || {};

        return {
          url: "/holidays",
          method: "GET",
          params: {
            page: pagination.page !== undefined ? pagination.page : 0,
            size: pagination.size !== undefined ? pagination.size : 10,
            sort: pagination.sort || "date",
          },
        };
      },
      providesTags: ["allholidays"],
    }),
  }),
});

export const { useGetAllHolidaysQuery } = holidayManagementApi;
