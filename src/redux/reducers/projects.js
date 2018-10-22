import {
  ADD_USER_TO_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_ALL_PROJECTS,
  GET_USER_PROJECTS,
  REMOVE_USER_FROM_PROJECT,
  UPDATE_PROJECT
} from '../actions/action.types'

export default (state = null, action) => {
  let a = action.payload;
  let pid, user, uid, newState,status, success;
  if (a) {
    status = a.status;
    success = status === "SUCCESS"
    pid = (a.projectId) || (a.project && a.project.projectId);
    user = a.user;
    uid = (user && user.mailId) || a.mailId
  }
  switch (action.type) {
    case GET_ALL_PROJECTS:
      if(success){
        console.log("ok")
      }
      return state;
    case GET_USER_PROJECTS:
      return state;
    case REMOVE_USER_FROM_PROJECT:
      newState = {...state};
      delete newState[pid].users[uid];
      return newState
    case ADD_USER_TO_PROJECT:
      return {...state, [pid]: {...state[pid], users: {...state[pid].users, [uid]: user}}};
    case CREATE_PROJECT:
      return {...state, [pid]: a.project};
    case UPDATE_PROJECT:
      return {...state, [pid]: a.project};
    case DELETE_PROJECT:
      newState = {...state};
      delete newState[pid];
      return newState
    default:
      return state;
  }
};
