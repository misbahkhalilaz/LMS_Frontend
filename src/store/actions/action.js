import store from "../store";
import { NAME, CHANGE_LOADING, CLEAR_STORE } from "../constants/constants";
import { Navigate } from "react-router";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";

const { dispatch } = store;

export const nameAction = (param) => {
  dispatch({ type: CHANGE_LOADING, payload: true });
  setTimeout(async () => {
    await dispatch({
      type: NAME,
      payload: param,
    });
    dispatch({ type: CHANGE_LOADING, payload: false });
  }, 5000);
};

export const clearStoreAction = () => {
  dispatch({ type: CLEAR_STORE });
};

export const loginAction = (payload, nav) => {
  const cookie = new Cookies();
  // setIsloading true
  API("POST", "/auth/login", payload)
    .then((res) => {
      // setIsloading false
      // logInStatus {msg: 'success', status: true}
      cookie.set("token", res.token, { path: "/", maxAge: 2000 });
      nav("/" + res.role);
    })
    .catch((err) => {
      // isLoading false
      // loginStatus{msg: 'failed', status: false}
    });
};
