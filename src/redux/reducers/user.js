import {SET_CURRENT_USER, TOGGLE_THEME} from "../actions/action.types";


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
      return action.payload.user;
    case TOGGLE_THEME:
      return {...state, lightTheme:!state.lightTheme};
    default:
      return state;
  }
};
