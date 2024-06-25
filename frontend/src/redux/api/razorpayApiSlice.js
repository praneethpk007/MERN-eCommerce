import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const razorpayApiSlice = createApi({
  reducerPath: 'razorpayApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/razorpay' }),
  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation({
      query: (amount) => ({
        url: 'create-order',
        method: 'POST',
        body: { amount },
      }),
    }),
    verifyRazorpayPayment: builder.mutation({
      query: (paymentResult) => ({
        url: 'verify-payment',
        method: 'POST',
        body: paymentResult,
      }),
    }),
  }),
});

export const { useCreateRazorpayOrderMutation, useVerifyRazorpayPaymentMutation } = razorpayApiSlice;
