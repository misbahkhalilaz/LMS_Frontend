import {
  LOAD_ASSIGNEDCLASS,
  SET_SELECTEDCLASS,
  LOAD_CLASSPOSTLIST,
  LOAD_CLASSSTUDENTS,
} from "../constants";

const teacherReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ASSIGNEDCLASS:
      return { ...state, assignedClasses: action.payload };
    case SET_SELECTEDCLASS:
      return { ...state, selectedClassId: action.payload };
    case LOAD_CLASSPOSTLIST:
      return { ...state, classPosts: action.payload };
    case LOAD_CLASSSTUDENTS:
      return { ...state, studentList: action.payload };
    default:
      return state;
  }
};

export default teacherReducer;
