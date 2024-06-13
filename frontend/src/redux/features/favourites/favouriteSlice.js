import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: "favourites",
    initialState: [],
    reducers: {
        addToFavourites: (state, action) => {
            if(!state.some((product) => product.id === action.payload.id)) {
                state.push(action.payload)
            }
        },
        removeFromFavourites: (state, action) => {
            return state.filter((product) => product.id !== action.payload)
        },
        setFavourites: (state, action) => {
            return action.payload
        },
    }
})

export const { addToFavourites, removeFromFavourites, setFavourites } = favouriteSlice.actions
export const selectFavouriteProduct = (state) => state.favourites
export default favouriteSlice.reducer