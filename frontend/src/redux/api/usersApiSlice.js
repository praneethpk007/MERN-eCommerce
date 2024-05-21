import { apiSlice } from "./apiSlice.js";
import { USER_LOGIN } from "../constants.js";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_LOGIN}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_LOGIN}/logout`,
                method: "POST",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_LOGIN}`,
                method: 'POST',
                body: data,
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USER_LOGIN}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: () =>({
                url: USER_LOGIN,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USER_LOGIN}/${userId}`,
                method: "DELETE",
            })
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USER_LOGIN}/${id}`
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_LOGIN}/${data._id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        })
    })
});

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useProfileMutation, 
    useGetUsersQuery, 
    useDeleteUserMutation, 
    useGetUserDetailsQuery, 
    useUpdateUserMutation 
} = userApiSlice;