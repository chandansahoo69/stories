import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface postState {
    post: {}[] | null,
}

const initialState: postState = {
    post: [ ], 
}

export const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers:{
        setPostsData: (state, action:PayloadAction<{}[]>) => {
            state.post = action.payload
        },
        setUpdatePostsData: (state, action) => {
            state.post = action.payload.Post;
            console.log(action);
            
        },
    }
})

export const { setPostsData, setUpdatePostsData } = postSlice.actions;

export default postSlice.reducer;