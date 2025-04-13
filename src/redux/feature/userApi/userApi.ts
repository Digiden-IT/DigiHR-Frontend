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
    // get all user api
    getAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["allUsers"],
    }),
    // delete user api
    toggleDeleteStatus: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}/toggle-delete`,
        method: "PUT",
      }),
      invalidatesTags: ["allUsers"],
    }),
  }),
});

export const {
  useUserRegistrationMutation,
  useGetSingleUserQuery,
  useGetAllUserQuery,
  useToggleDeleteStatusMutation,
} = userApi;
