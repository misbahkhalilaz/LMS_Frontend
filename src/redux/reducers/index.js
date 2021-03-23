import { combineReducers } from "redux";

import generalReducer from "./general";
import adminReducer from "./admin";

const allReducers = combineReducers({
  generalReducer,
  adminReducer,
});

export default allReducers;
