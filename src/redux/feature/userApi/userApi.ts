import { TQueryParam } from "./../../../types/api.type";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    getSingleUser: builder.query({
      query: (userId: number) => ({
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
    getUserFilerOptions: builder.query<any, void>({
      query: () => ({
        url: "users/filter-options",
        method: "GET",
      }),
      providesTags: ["filterOptions"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["allusers"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetSingleUserQuery,
  useGetAllUserQuery,
  useToggleDeleteStatusMutation,
  useGetUserFilerOptionsQuery,
  useUpdateUserMutation
} = userApi;
