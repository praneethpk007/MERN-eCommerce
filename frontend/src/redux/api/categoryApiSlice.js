import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        updateCategory: builder.mutation({
            query: ({categoryId, data}) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'PUT',
                body: data,
            })
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'DELETE',
            })
        }),
        listCategory: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`,
                method: 'GET',
            })
        }),
        readCategory: builder.query({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'GET',
            })
        })
    })
})

export const { useCreateCategoryMutation, 
    useDeleteCategoryMutation, 
    useListCategoryQuery, 
    useReadCategoryQuery, 
    useUpdateCategoryMutation 
} = categoryApiSlice;