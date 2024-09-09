import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value : ''
};

export const search = createSlice({
    name: "search",
    initialState,
    reducers:{
        handleSearch:(state,action)=>{
            state.value = action.payload;
        },

    }
});



export const {handleSearch} = search.actions;
export default search.reducer;

