import { combineReducers } from "redux";

import { loadingBarReducer } from "react-redux-loading-bar";
import loggerReducer from "./logger";
import adminReducer from "./admin";
import teacherReducer from "./teacher";
import studentReducer from "./student";

const allReducers = combineReducers({
  loadingBar: loadingBarReducer,
  loggerReducer,
  adminReducer,
  teacherReducer,
  studentReducer,
});

export default allReducers;
