import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
    name: "products",
    initialState: {
        productList:[],
        filteredProduct:[]
    },
    reducers: { // hear reducers
        fetchAndStore:(state,action)=>{
            state.productList=action.payload;
        }, //this is an action creator
        filterAndStore:(state,action)=>{
            console.log("Filtered Products:", action.payload);
            state.filteredProduct=action.payload;
        },
    },
})
export const {fetchAndStore,filterAndStore}=productSlice.actions;
export default productSlice.reducer; //here reducer