import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import { CLEAR_STORE, LOADING, LOGGED_IN, CHECKING_TOKEN } from "../constants";

export const clearStoreAction = () => {
  return { type: CLEAR_STORE };
};

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const checkTokenAction = (payload) => {
  return { type: CHECKING_TOKEN, payload };
};

export const loginStatAction = (payload) => {
  const cookie = new Cookies();
  if (!payload) cookie.remove("token");

  return { type: LOGGED_IN, payload };
};

export const loginAction = (payload, navigate, message) => {
  return (dispatch) => {
    const cookie = new Cookies();
    dispatch(loadingAction(true));

    API("POST", "/auth/login", payload).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        dispatch(loginStatAction(true));
        cookie.set("token", res.data.token, { path: "/", maxAge: 2000 });
        navigate("/" + res.data.role, { replace: true });
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    });
  };
};

export const loginTokenAction = (navigate, requestedPath) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(checkTokenAction(false));
  API("POST", "/auth", {}, null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      res.data.role == requestedPath.split("/")[1]
        ? navigate(requestedPath)
        : navigate("/" + res.data.role, { replace: true });

      dispatch(loginStatAction(true));
    } else {
      dispatch(loginStatAction(false));
      navigate("/login", { replace: true });
    }

    dispatch(checkTokenAction(true));
  });
};

export const requestOtpAction = (userId, message, setToken, setCurrent) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    API("POST", "/auth/forgetPassword", userId).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setToken(res.data.token);
        setCurrent((prev) => prev + 1);
        message.success(res.data.message);
      } else message.error(res.data.message);

      dispatch(loadingAction(false));
    });
  };
};

export const verifyOtpAction = (otp, token, message, setToken, setCurrent) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    API("POST", "/auth/verifyOtp", otp, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setToken(res.data.token);
        setCurrent((prev) => prev + 1);
        message.success(res.data.message);
      } else message.error(res.data.message);

      dispatch(loadingAction(false));
    });
  };
};

export const setPassAction = (password, token, message, setShowSetPass) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    API("POST", "/auth/resetPassword", password, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setShowSetPass(false);
        message.success(res.data.message);
      } else message.error(res.data.message);

      dispatch(loadingAction(false));
    });
  };
};
