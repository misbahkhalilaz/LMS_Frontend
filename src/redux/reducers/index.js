import { combineReducers } from "redux";

import loggedReducer from "./isLogged";
import adminReducer from "./admin";

const allReducers = combineReducers({
  isLogging: loggedReducer,
  adminReducer,
});

export default allReducers;
