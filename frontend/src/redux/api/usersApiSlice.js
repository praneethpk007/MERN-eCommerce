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
    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = userApiSlice;