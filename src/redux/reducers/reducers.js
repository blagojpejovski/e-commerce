import { combineReducers } from "redux";
import dialogReducer from "../dialog/dialogSlice";
import productReducer from "../product/productSlice";
import utilityReducer from "../utility/utilitySlice";

const reducers = combineReducers({
    dialog: dialogReducer,
    product: productReducer,
    utility: utilityReducer,
});

export default reducers;
