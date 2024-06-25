import {apiSlice} from './apiSlice';
import { ORDERS_URL, RAZORPAY_URL } from '../constants';
import { get } from 'mongoose';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
            })
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
            })
        }),
        createRazorpayOrder: builder.mutation({
            query: (amount) => ({
                url: `${RAZORPAY_URL}/order`,
                method: 'POST',
                body: { amount },
            })
        }),
        verifyRazorpayPayment: builder.mutation({
            query: (paymentResult) => ({
                url: `${RAZORPAY_URL}/verify-payment`,
                method: 'POST',
                body: paymentResult,
            })
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details,
            })
        }),
        getRazorPayClientId: builder.query({
            query: () => ({
                url: RAZORPAY_URL,
            })
        }),
        getUserOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
            })
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            })
        }),
        getTotalOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/total-orders`,
            })
        }),
        getTotalSales: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/total-sales`,
            })
        }),
        getTotalSalesByDate: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/total-sales-by-date`,
            })
        }),
    }),
})

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetRazorPayClientIdQuery,
    useGetUserOrdersQuery,
    useDeliverOrderMutation,
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
    useGetOrdersQuery,
    useCreateRazorpayOrderMutation,
    useVerifyRazorpayPaymentMutation,
} = orderApiSlice;
export default orderApiSlice.reducer;