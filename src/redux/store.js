import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers";
import { CLEAR_STORE } from "./constants";

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    return (state = {
      loadingBar: { default: state.loadingBar.default },
      loggerReducer: { allowRender: true, isLogged: false },
    });
  }

  return allReducers(state, action);
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
