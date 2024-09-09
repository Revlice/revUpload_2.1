import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        name: localStorage.getItem('name') || '',
        username: localStorage.getItem('username') || '',
    },
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserProfile: (state, action) => {
            state.user = action.payload;
            // LocalStorage'a kaydetme işlemi burada da yapılabilir
            localStorage.setItem('name', action.payload.name);
            localStorage.setItem('username', action.payload.username);
        },
        setAuthentication: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { updateUserProfile, setAuthentication } = authSlice.actions;

export default authSlice.reducer;
