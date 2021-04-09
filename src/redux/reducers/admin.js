import {
  LOAD_TEACHERLIST,
  LOAD_PROGRAMLIST,
  LOAD_BATCHLIST,
  LOAD_SECTIONLIST,
  LOAD_TEACHERLIST_PAGE,
  LOAD_TEACHERLIST_PAGESIZE,
  LOAD_TEACHERLIST_TOTAL,
  LOAD_COURSELIST,
} from "../constants";

const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_PROGRAMLIST:
      return { ...state, programList: action.payload };
    case LOAD_BATCHLIST:
      return { ...state, batchList: action.payload };
    case LOAD_SECTIONLIST:
      return { ...state, sectionList: action.payload };
    case LOAD_TEACHERLIST:
      return { ...state, teacherList: action.payload };
    case LOAD_COURSELIST:
      return { ...state, courseList: action.payload };
    case LOAD_TEACHERLIST_PAGE:
      return { ...state, teacherPage: action.payload };
    case LOAD_TEACHERLIST_PAGESIZE:
      return { ...state, teacherPageSize: action.payload };
    case LOAD_TEACHERLIST_TOTAL:
      return { ...state, teacherTotal: action.payload };
    default:
      return state;
  }
};

export default adminReducer;
