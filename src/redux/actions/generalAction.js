import store from "../store";
import { SIGNING_IN, CLEAR_STORE } from "../constants";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";

const { dispatch } = store;

export const clearStoreAction = () => {
  dispatch({ type: CLEAR_STORE });
};

export const loginAction = (payload, nav) => {
  const cookie = new Cookies();
  dispatch({ type: SIGNING_IN, payload: true });
  API("POST", "/auth/login", payload)
    .then((res) => {
      cookie.set("token", res.token, { path: "/", maxAge: 2000 });
      nav("/" + res.role);
      dispatch({ type: SIGNING_IN, payload: false });
    })
    .catch((err) => {
      dispatch({ type: SIGNING_IN, payload: false });
      // loginStatus{msg: 'failed', status: false}
    });
};
