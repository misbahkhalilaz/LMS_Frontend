import store from "../store";
import {
  LOGGING_IN,
  LOGIN_FAILED,
  CHECKING_TOKEN,
  CLEAR_STORE,
} from "../constants";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";

const { dispatch } = store;

export const clearStoreAction = () => {
  dispatch({ type: CLEAR_STORE });
};

export const loginAction = (payload, navigate) => {
  const cookie = new Cookies();
  dispatch({ type: LOGGING_IN, payload: true });
  API("POST", "/auth/login", payload)
    .then((res) => {
      cookie.set("token", res.token, { path: "/", maxAge: 2000 });
      navigate("/" + res.role, { replace: true });
      dispatch({ type: LOGGING_IN, payload: false });
    })
    .catch((err) => {
      dispatch({ type: LOGGING_IN, payload: false });
      dispatch({ type: LOGIN_FAILED, payload: err });
      // loginStatus{msg: 'failed', status: false}
    });
};

export const tokenAction = (payload, navigate) => {
  const cookie = new Cookies();
  dispatch({ type: CHECKING_TOKEN, payload: true });
  API("POST", "/auth", {}, payload)
    .then((res) => {
      res.role
        ? navigate("/" + res.role)
        : (cookie.remove("token"), navigate("/login"));
      dispatch({ type: CHECKING_TOKEN, payload: false });
    })
    .catch(() => {
      cookie.remove("token");
      navigate("/login");
      dispatch({ type: CHECKING_TOKEN, payload: false });
    });
};
