import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers";
import { CLEAR_STORE } from "./constants";

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    return (state = undefined);
  }

  return allReducers(state, action);
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
