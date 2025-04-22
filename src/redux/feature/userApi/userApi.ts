import { TQueryParam } from './../../../types/api.type';
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // registration api
    userRegistration: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    // get single user api
    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users",
          method: "GET",
          params: params,
          providesTags: ["allusers"],
        };
      },
    }),
    toggleDeleteStatus: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allusers"],
    }),
  }),
});

export const {
  useUserRegistrationMutation,
  useGetSingleUserQuery,
  useGetAllUserQuery,
  useToggleDeleteStatusMutation,
} = userApi;
