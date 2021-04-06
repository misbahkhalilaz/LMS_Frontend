import { LOAD_CLASSES, LOAD_STUDENTID } from "../constants";

const studentReducer = (state = { classes: [] }, action) => {
  switch (action.type) {
    case LOAD_CLASSES:
      return { ...state, classes: action.payload };
    case LOAD_STUDENTID:
      return { ...state, studentId: action.payload };
    default:
      return state;
  }
};

export default studentReducer;
