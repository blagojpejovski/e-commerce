import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers/reducers";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

const defaultState = {};

export const store = configureStore({
    reducer: reducers,
    defaultState,
});

setupListeners(store.dispatch);
