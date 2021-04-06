import { LOAD_ASSIGNEDCLASS, LOAD_TEACHERID } from "../constants";

const teacherReducer = (state = { assignedClasses: [] }, action) => {
  switch (action.type) {
    case LOAD_ASSIGNEDCLASS:
      return { ...state, assignedClasses: action.payload };
    case LOAD_TEACHERID:
      return { ...state, teacherId: action.payload };
    default:
      return state;
  }
};

export default teacherReducer;
