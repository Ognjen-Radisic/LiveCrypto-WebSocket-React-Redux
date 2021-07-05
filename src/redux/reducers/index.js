import { combineReducers } from "redux";
import profile from "./profile";
import tableData from "./tableData";

const reducers = combineReducers({
	profile,
	tableData,
});

export default reducers;
