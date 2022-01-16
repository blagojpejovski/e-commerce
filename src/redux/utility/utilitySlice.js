import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "utility",
    initialState: {
        states: [],
        categories: [],
    },
    reducers: {
        setStates: (state, action) => {
            state.states = [...action.payload.states];
        },
        setCategories: (state, action) => {
            state.categories = [...action.payload.categories];
        },
    },
});

export const { setStates, setCategories } = slice.actions;

export default slice.reducer;
