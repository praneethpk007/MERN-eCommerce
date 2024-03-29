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
    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApiSlice;