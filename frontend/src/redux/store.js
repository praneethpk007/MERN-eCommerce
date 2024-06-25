import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {apiSlice} from './api/apiSlice.js';
import authReducer from './features/auth/authSlice.js';
import favouriteReducer from './features/favourites/favouriteSlice.js';
import cartSliceReducer from './features/cart/cartSlice.js';
import shopSliceReducer from './features/shop/shopSilce.js';
import { razorpayApiSlice } from './api/razorpayApiSlice.js';
import {
    getFavourites,
    addFavouritestoLocalStorage,
    removeFavouritestoLocalStorage,
} from '../Utils/localStorage.js';

const initialFavourites = getFavourites() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [razorpayApiSlice.reducerPath]: razorpayApiSlice.reducer,
        auth: authReducer,
        favourites: favouriteReducer,
        cart: cartSliceReducer,
        shop: shopSliceReducer,
    },

    preloadedState: {
        favourites: initialFavourites,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware, razorpayApiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
export default store;