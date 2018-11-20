import {
  ADD_USER_TO_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_USER_PROJECTS,
  REMOVE_USER_FROM_PROJECT,
  UPDATE_PROJECT
} from '../actions/action.types'
import {dbArrayToObject} from '../actions/utils'

export default (state = null, action) => {
  let a = action.payload;
  let pid, user, uid, newState, status, success, request;
  if (a) {
    status = a.status;
    success = status === "SUCCESS" || action.status === "SUCCESS";
    request = status === "REQUEST" || action.status === "REQUEST";
    pid = (a._id) || (a.id) || (a.project && a.project._id);
    user = a.user;
    uid = (user && user._id) || a._id
  }
  switch (action.type) {
    case GET_USER_PROJECTS:
      return success ? dbArrayToObject(a.rows) : state;
    case REMOVE_USER_FROM_PROJECT:
      return success ? {...state, [pid]: a} : state;
    case ADD_USER_TO_PROJECT:
      return success ? {...state, [pid]: a} : state;
    case CREATE_PROJECT:
      return success ? {...state, [pid]: a} : state;
    case UPDATE_PROJECT:
      return success ? {...state, [pid]: a} : state;
    case DELETE_PROJECT:
      newState = {...state};
      delete newState[pid];
      return newState
    default:
      return state;
  }
};
