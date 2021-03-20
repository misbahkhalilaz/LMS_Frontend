import { LOGGING_IN, LOGIN_FAILED, CHECKING_TOKEN } from "../constants";

const loggedReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return { ...state, isLogging: action.payload };
    case LOGIN_FAILED:
      return { ...state, failedLogin: action.payload };
    case CHECKING_TOKEN:
      return { ...state, allowRender: !action.payload };
    default:
      return state;
  }
};

export default loggedReducer;
