import { LOAD_CLASSES, LOAD_STUDENTID, SET_STDSELECTEDCLASS, LOAD_POSTLIST } from "../constants";

const studentReducer = (state = { classes: [] }, action) => {
  switch (action.type) {
    case LOAD_CLASSES:
      return { ...state, classes: action.payload };
    case LOAD_STUDENTID:
      return { ...state, studentId: action.payload };
    case SET_STDSELECTEDCLASS:
      return { ...state, selectedClassId: action.payload };
    case LOAD_POSTLIST:
      return { ...state, classPosts: action.payload };
    default:
      return state;
  }
};

export default studentReducer;
