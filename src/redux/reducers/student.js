import { LOAD_CLASSES, SET_STDSELECTEDCLASS, LOAD_POSTLIST } from "../constants";

const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CLASSES:
      return { ...state, classes: action.payload };
    case SET_STDSELECTEDCLASS:
      return { ...state, selectedClassId: action.payload };
    case LOAD_POSTLIST:
      return { ...state, classPosts: action.payload };
    default:
      return state;
  }
};

export default studentReducer;
