import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { nameReducer, setIsLoading } from "./reducers/reducer";

const initStore = {
  isLoading: false,
  name: "",
};

const reducer = combineReducers({
  name: nameReducer,
  isLoading: setIsLoading,
});

const store = createStore(reducer, initStore, applyMiddleware(thunk));

export default store;
