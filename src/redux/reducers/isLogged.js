import { SIGNING_IN } from "../constants";

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return action.payload;
    default:
      return state;
  }
};

export default loggedReducer;
