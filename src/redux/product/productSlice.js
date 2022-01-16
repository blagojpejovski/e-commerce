import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "product",
    initialState: {
        products: [],
        selectedProduct: {},
    },
    reducers: {
        currentProducts: (state, action) => {
            state.products = [...state.products, ...action.payload.products];
            state.selectedProduct = state.products[0];
        },
        createProduct: (state, action) => {
            state.products = [
                ...state.products,
                { ...action.payload.product, id: state.products.length + 1 },
            ];
        },
        selectProduct: (state, action) => {
            state.selectedProduct = {
                ...state.products.find(
                    (product) => product.id === +action.payload.productId
                ),
            };
        },
        sortProducts: (state, action) => {
            state.products = state.products.sort((a, b) => {
                if (action.payload.type === "name") {
                    if (action.payload.ascending) {
                        return a.title.toLowerCase() >= b.title.toLowerCase()
                            ? 1
                            : -1;
                    } else {
                        return a.title.toLowerCase() <= b.title.toLowerCase()
                            ? 1
                            : -1;
                    }
                }
                if (action.payload.type === "price") {
                    if (action.payload.ascending) {
                        return a.price >= b.price ? 1 : -1;
                    } else {
                        return a.price <= b.price ? 1 : -1;
                    }
                }
                return 0;
            });
        },
    },
});

export const { createProduct, selectProduct, currentProducts, sortProducts } =
    slice.actions;

export default slice.reducer;
