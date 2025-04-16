import { baseApi } from "./baseApi";
import { TQueryParam } from "../../types/api.type";

const holidayManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHolidays: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        console.log(args);

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/holidays",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetAllHolidaysQuery } = holidayManagementApi;
