import { LOADING, LOGGED_IN, CHECKING_TOKEN, SET_USERID, SET_SELECTEDPOST } from "../constants";

const loggerReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: action.payload };
    case LOGGED_IN:
      return { ...state, isLogged: action.payload };
    case CHECKING_TOKEN:
      return { ...state, allowRender: !action.payload };
    case SET_USERID:
      return { ...state, userId: action.payload };
    case SET_SELECTEDPOST:
      return { ...state, selectedPost: action.payload };
    default:
      return state;
  }
};

export default loggerReducer;
