import {SET_CURRENT_USER} from "../actions/action.types";


export default (state = null, action) => {

  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload.user;
    default:
      return state;
  }
};
