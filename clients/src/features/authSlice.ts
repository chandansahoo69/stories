import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    user: {} | null,
    accessToken: string | {},
    refreshToken: string | {},
    error: boolean
}
//get the user profile from localstorage if any
const localStorageUser:userState["user"] = localStorage.getItem('localStorageUser') 
                       ? JSON.parse(localStorage.getItem('localStorageUser') || '{}').profile
                       : null
const accToken:userState["user"] = localStorage.getItem('localStorageUser') 
                       ? JSON.parse(localStorage.getItem('localStorageUser') || '{}').accessToken
                       : null
const refToken:userState["user"] = localStorage.getItem('localStorageUser') 
                       ? JSON.parse(localStorage.getItem('localStorageUser') || '{}').refreshToken
                       : null
const initialState: userState = {
    user: localStorageUser || null, //set default value as user profile or null if not
    accessToken: accToken ? accToken : "",
    refreshToken: refToken ? refToken : "",
    error: false,
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers:{
        setLoginSuccess: (state, action:PayloadAction<{
            profile:{},
            accessToken: string,
            refreshToken: string,
        }>) => {
            //set user profile in localstorage
            console.log("update user data---->", action.payload);
            
            localStorage.setItem('localStorageUser', JSON.stringify( action.payload ))
            state.user = action.payload.profile
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.error = false
            console.log("store state value after update--->",state);
            
        },
        setUpdateProfile: (state, action:PayloadAction<{
            profile:{},
        }>) => {
            //set user profile in localstorage
            console.log("updated user ---->", action.payload);
            state.user = action.payload.profile
            state.accessToken = accToken ? accToken : ""
            state.refreshToken = refToken ? refToken : ""
            console.log("store state value after update--->",state);
            
        },
        setLoginFailed: (state, action:PayloadAction<void>) => {
            state.user = null
            state.error = true
        },
        Logout: (state, action:PayloadAction<void>) => {
            localStorage.removeItem('localStorageUser');
            state.user = null
            state.accessToken = ""
            state.refreshToken = ""
            state.error = false
        },  
    }
})

export const { setLoginSuccess, setLoginFailed, Logout, setUpdateProfile} = authSlice.actions;

export default authSlice.reducer;