import {FETCH_USER, SET_MAP_STYLE, TOGGLE_THEME} from "../actions/action.types";


export default (state = null, action) => {
  let a = action.payload;
  let user, request, newState, status, success;
  if (a) {
    status = action.status;
    request = status === "REQUEST";
    success = status === "SUCCESS";
  }

  switch (action.type) {
    case TOGGLE_THEME:
      return {...state, darkTheme: !state.darkTheme};
    case FETCH_USER:
      return action.payload || null;
    case SET_MAP_STYLE:
      return {...state, mapStyle: a.mapStyle};
    default:
      return state;
  }
};
