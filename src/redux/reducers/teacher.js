import {
  LOAD_ASSIGNEDCLASS,
  LOAD_TEACHERID,
  SET_SELECTEDCLASS,
  LOAD_CLASSPOSTLIST,
} from "../constants";

const teacherReducer = (state = { assignedClasses: [], classPosts: [] }, action) => {
  switch (action.type) {
    case LOAD_TEACHERID:
      return { ...state, teacherId: action.payload };
    case LOAD_ASSIGNEDCLASS:
      return { ...state, assignedClasses: action.payload };
    case SET_SELECTEDCLASS:
      return { ...state, selectedClassId: action.payload };
    case LOAD_CLASSPOSTLIST:
      return { ...state, classPosts: action.payload };
    default:
      return state;
  }
};

export default teacherReducer;
