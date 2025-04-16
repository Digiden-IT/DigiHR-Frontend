import { baseApi } from "./baseApi";
import { TQueryParam } from "../../types/api.type";

const holidayManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHolidays: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/holidays",
          method: "GET",
          params: params,
          providesTags: ["allholidays"],
        };
      },
    }),
    addNewHoliday: builder.mutation({
      query: (data) => ({
        url: "/holidays",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allholidays"],
    }),
    deleteHoliday: builder.mutation({
      query: (id) => ({
        url: `/holidays/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allholidays"],
    }),
  }),
});

export const { useGetAllHolidaysQuery, useAddNewHolidayMutation,useDeleteHolidayMutation } = holidayManagementApi;
