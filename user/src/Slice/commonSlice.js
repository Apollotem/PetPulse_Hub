import { createSlice } from "@reduxjs/toolkit";
const commonSlice = createSlice({
    name: "common",
    initialState: {
        prvRoute: "/",
        imagePath:"http://localhost:5001/",
        authId:null
    },
    reducers: {
        setRoute: (state, action) => {
            state.prvRoute = action.payload
        },
        setAuthId: (state, action) => {
            state.authId = action.payload
        },
    }
})
export const {setRoute,setAuthId}=commonSlice.actions;
export default commonSlice.reducer; 