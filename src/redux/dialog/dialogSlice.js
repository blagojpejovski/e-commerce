import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "dialog",
    initialState: {
        dialogVisible: false,
    },
    reducers: {
        openDialog: (state, action) => {
            state.dialogVisible = action.payload.dialogVisible;
        },
    },
});

export const { openDialog } = slice.actions;

export default slice.reducer;
