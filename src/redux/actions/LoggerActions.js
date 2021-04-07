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
  SET_ROOMID,
} from "../constants";

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
  if (!payload) cookie.remove("token", { path: "/", maxAge: 2000 });

  return { type: LOGGED_IN, payload };
};

export const setUserId = (payload) => {
  return { type: SET_USERID, payload };
};

export const setRoomId = (payload) => {
  return { type: SET_ROOMID, payload };
};

export const loginAction = (payload, navigate, message) => (dispatch) => {
  const cookie = new Cookies();
  dispatch(loadingAction(true));

  API("POST", "/auth/login", payload).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      dispatch(loginStatAction(true));
      dispatch(setUserId(res.data.userId));
      cookie.set("token", res.data.token, { path: "/", maxAge: 2000 });
      navigate("/" + res.data.role, { replace: true });

      dispatch(setAdminValues(res.data.role, res.data.token));
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const loginTokenAction = (navigate, requestedPath) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");

  dispatch(showLoading());
  dispatch(checkTokenAction(false));
  API("POST", "/auth", {}, null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      res.data.role == requestedPath.split("/")[1]
        ? navigate(requestedPath, { replace: true })
        : navigate("/" + res.data.role, { replace: true });

      dispatch(loginStatAction(true));
      dispatch(setAdminValues(res.data.role, token));
      dispatch(setUserId(res.data.userId));
    } else {
      dispatch(loginStatAction(false));

      navigate("/login", { replace: true });
    }

    dispatch(checkTokenAction(true));
    dispatch(hideLoading());
  });
};

export const requestOtpAction = (userId, message, setToken, setCurrent) => (dispatch) => {
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

export const verifyOtpAction = (otp, token, message, setToken, setCurrent) => (dispatch) => {
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

export const setPassAction = (password, token, message, setShowSetPass) => (dispatch) => {
  dispatch(loadingAction(true));
  API("POST", "/auth/resetPassword", password, null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      setShowSetPass(false);
      message.success(res.data.message);
    } else message.error(res.data.message);

    dispatch(loadingAction(false));
  });
};

//IMPACT IN ADMIN REDUCER
const setAdminValues = (role, token) => async (dispatch) => {
  if (role != "admin") return;

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
