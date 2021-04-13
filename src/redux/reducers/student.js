import { SET_STDSEMESTER, LOAD_CLASSES, SET_STDSELECTEDCLASS, LOAD_POSTLIST } from "../constants";

const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_STDSEMESTER:
      return { ...state, semester: action.payload };
    case LOAD_CLASSES:
      return { ...state, classes: action.payload };
    case SET_STDSELECTEDCLASS:
      return { ...state, selectedClass: action.payload };
    case LOAD_POSTLIST:
      return { ...state, classPosts: action.payload };
    default:
      return state;
  }
};

export default studentReducer;
