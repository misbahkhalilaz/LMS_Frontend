import { CHANGE_LOADING, NAME } from "../constants/constants";

export function nameReducer(state = "", action) {
  switch (action.type) {
    case NAME:
      return action.payload;
    default:
      return state;
  }
}

export function setIsLoading(state = false, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return action.payload;
    default:
      return state;
  }
}
