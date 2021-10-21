import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import postSlice from "../features/postSlice";
import thunk from "redux-thunk"

export const store = configureStore({
    reducer:{
        authSclice: authSlice,
        postSclice: postSlice
    },
    middleware: [thunk]
})

//state of application
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;