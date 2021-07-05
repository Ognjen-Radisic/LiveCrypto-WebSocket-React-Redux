import { combineReducers } from "redux";
import profile from "./profile";
import tableData from "./tableData";
import login from "./login";

const reducers = combineReducers({
	profile,
	tableData,
	login,
});

export default reducers;
