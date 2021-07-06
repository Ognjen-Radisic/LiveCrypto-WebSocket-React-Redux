import { combineReducers } from "redux";
import profile from "./profile";
import tableData from "./tableData";
import login from "./login";
import pairChannel from "./pairChannel";

const reducers = combineReducers({
	profile,
	tableData,
	login,
	pairChannel,
});

export default reducers;
