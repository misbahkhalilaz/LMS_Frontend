import { LOAD_TEACHERLIST, LOAD_BATCHLIST } from "../constants";

const adminReducer = (state = { teacherList: [], batchList: [] }, action) => {
  switch (action.type) {
    case LOAD_TEACHERLIST:
      return { ...state, teacherList: action.payload };
    case LOAD_BATCHLIST:
      return { ...state, batchList: action.payload };
    default:
      return state;
  }
};

export default adminReducer;
