import {SET_CURRENT_USER, TOGGLE_USER_PREFERENCE} from "../actions/action.types";


export default (state = null, action) => {
  let a = action.payload;
  let user, request, newState, status, success;
  if (a) {
    status = action.status;
    request = status === "REQUEST";
    success = status === "SUCCESS";
  }

  switch (action.type) {
    case SET_CURRENT_USER:
      return success ? action.payload : state;
    case TOGGLE_USER_PREFERENCE:
      return request || success ? a : state;
    default:
      return state;
  }
};
