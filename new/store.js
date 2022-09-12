import {configureStore} from "@reduxjs/toolkit";
import basketReucer from './features/basketSlice';

export const store = configureStore({
    reducer: {
        basket: basketReucer

    },
});