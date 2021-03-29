import { combineReducers } from "redux";

import loggerReducer from "./logger";
import adminReducer from "./admin";

const allReducers = combineReducers({
  loggerReducer,
  adminReducer,
});

export default allReducers;
