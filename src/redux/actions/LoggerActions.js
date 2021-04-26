import { message } from "antd";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import {
  CLEAR_STORE,
  LOADING,
  LOGGED_IN,
  CHECKING_TOKEN,
  LOAD_PROGRAMLIST,
  LOAD_BATCHLIST,
  LOAD_SECTIONLIST,
  SET_USERID,
  SET_SELECTEDPOST,
} from "../constants";

export const clearStoreAction = () => ({ type: CLEAR_STORE });

export const setLoading = (payload) => ({ type: LOADING, payload });

export const setCheckToken = (payload) => ({ type: CHECKING_TOKEN, payload });

export const setUserId = (payload) => ({ type: SET_USERID, payload });

export const setClassPost = (payload) => ({ type: SET_SELECTEDPOST, payload });

export const loginStatusAction = (payload) => {
  if (!payload) {
    localStorage.removeItem("class");
    new Cookies().remove("token", { path: "/", maxAge: 86400 });
  }

  return { type: LOGGED_IN, payload };
};

export const loginAction = (payload, navigate, setRole) => (dispatch) => {
  const cookie = new Cookies();
  dispatch(setLoading(true));

  API("POST", "/auth/login", payload).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const { userId, token, role, name } = res.data;

      setRole(role);

      if (role === "admin") dispatch(setAdminValues(token));
      dispatch(loginStatusAction(true));
      dispatch(setUserId(userId));

      cookie.set("token", token, { path: "/", maxAge: 86400 });
      navigate("/" + role, { replace: true });

      message.success(`Welcome ${name}!`, 1);
    } else message.error(res.data.message);

    dispatch(setLoading(false));
  });
};

export const tokenAuthAction = (setRole) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  if (!token) {
    dispatch(loginStatusAction(false));
    dispatch(clearStoreAction());
    return;
  }

  dispatch(showLoading());
  dispatch(setCheckToken(true));
  API("POST", "/auth", {}, null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const { userId, role } = res.data;

      setRole(role);
      dispatch(loginStatusAction(true));
      dispatch(setUserId(userId));
      if (role === "admin") dispatch(setAdminValues(token));

      // if ("/" + window.location.pathname.split("/")[1] !== window.location.pathname) navigate(-1);
      // navigate(role, { replace: true });
    } else {
      dispatch(loginStatusAction(false));
      //navigate("/login", { replace: true });
      dispatch(clearStoreAction());
    }

    dispatch(setCheckToken(false));
    dispatch(hideLoading());
  });
};

export const requestOtpAction = (userId, setToken, setCurrent) => (dispatch) => {
  dispatch(setLoading(true));

  API("POST", "/auth/forgetPassword", userId).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      setToken(res.data.token);
      setCurrent((prev) => prev + 1);

      message.success(res.data.message);
    } else message.error(res.data.message);

    dispatch(setLoading(false));
  });
};

export const verifyOtpAction = (otp, token, setToken, setCurrent) => (dispatch) => {
  dispatch(setLoading(true));

  API("POST", "/auth/verifyOtp", otp, null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      setToken(res.data.token);
      setCurrent((prev) => prev + 1);

      message.success(res.data.message);
    } else message.error(res.data.message);

    dispatch(setLoading(false));
  });
};

export const setPasswordAction = (password, token, setShowSetPass) => (dispatch) => {
  dispatch(setLoading(true));

  API("POST", "/auth/resetPassword", password, null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      setShowSetPass(false);

      message.success(res.data.message);
    } else message.error(res.data.message);

    dispatch(setLoading(false));
  });
};

//IMPACT IN ADMIN REDUCER
const setAdminValues = (token) => async (dispatch) => {
  let programInfo;
  const batchInfo = {};
  const sectInfo = {};

  await API("GET", "/admin/getProgramsWithDetails", "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300)
      programInfo = res.data.data.map((program) => {
        const shiftWise = { Morning: [], Evening: [] };

        program.batch.map((batch) => {
          sectInfo[batch.id] = batch.sections.map((sect) => ({
            label: sect.name,
            value: sect.id,
          }));

          batch.shift == "Morning"
            ? shiftWise.Morning.push({
                label: batch.name,
                value: batch.id,
                semester: batch.current_semester,
              })
            : shiftWise.Evening.push({
                label: batch.name,
                value: batch.id,
                semester: batch.current_semester,
              });
        });

        batchInfo[program.id] = shiftWise;
        return {
          label: program.name,
          value: program.id,
          years: program.no_of_years,
        };
      });
    else message.error(res.data.message + ". Refresh the screen!");
  });

  dispatch({ type: LOAD_PROGRAMLIST, payload: programInfo });
  dispatch({ type: LOAD_BATCHLIST, payload: batchInfo });
  dispatch({ type: LOAD_SECTIONLIST, payload: sectInfo });
};
