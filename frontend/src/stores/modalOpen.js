import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        open: false,
        video: {
            name: "",
            description: "",
            url: "",
        },
    },
    reducers: {
        handleOpen: (state) => {
            state.open = true;
        },
        handleClose: (state) => {
            state.open = false;
            state.video = { name: "", description: "", url: "" };
        },
        setVideoName: (state, action) => {
            state.video.name = action.payload;
        },
        setVideoDescription: (state, action) => {
            state.video.description = action.payload;
        },
        setVideoURL: (state, action) => {
            state.video.url = action.payload;
        },
    },
});

export const { handleOpen, handleClose, setVideoName, setVideoDescription, setVideoURL } = modalSlice.actions;
export default modalSlice.reducer;
