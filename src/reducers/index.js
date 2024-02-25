import todoReducer from "./todo";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    todo:todoReducer,
})

export default allReducers;