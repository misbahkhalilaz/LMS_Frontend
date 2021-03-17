import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { nameReducer, setIsLoading } from "./reducers/reducer";
import { CLEAR_STORE } from "./constants/constants";

const initStore = {
  isLoading: false,
  name: "",
};

const appReducer = combineReducers({
  name: nameReducer,
  isLoading: setIsLoading,
});

const rootReducer = (state = initStore, action) => {
  if (action.type === CLEAR_STORE) {
    return initStore;
  } else return appReducer(state, action);
};

const store = createStore(rootReducer, initStore, applyMiddleware(thunk));

export default store;
