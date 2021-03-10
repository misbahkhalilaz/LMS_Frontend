import store from "../store";
import { NAME, CHANGE_LOADING } from "../constants/constants";

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
