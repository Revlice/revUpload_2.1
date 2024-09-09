import {createSlice} from "@reduxjs/toolkit";

export const auth = createSlice({
    name: "auth",
    initialState:{
        isAuthenticated:false,
        user:null
    },
    reducers:{
        handleLogin: (state,action) =>{
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        handleLogout: state=>{
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("user");
        }
    }
});



export const {handleLogin, handleLogout} = auth.actions;
export default auth.reducer;

