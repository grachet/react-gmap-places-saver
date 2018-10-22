import {
  ADD_USER_TO_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_ALL_PROJECTS,
  GET_USER_PROJECTS,
  REMOVE_USER_FROM_PROJECT,
  UPDATE_PROJECT,
  REQUEST,
  FAILURE,
  SUCCESS,
} from './action.types'
import fetch from 'cross-fetch'

// export function getAllProjects() {
//   return {
//     type: GET_ALL_PROJECTS
//   }
// }

export function getAllProjects() {
  return dispatch => {

    dispatch(send(REQUEST));

    fetch('https://randomuser.me/api/')
      .then( projects => projects.json() )
      .then( rep => dispatch(send(SUCCESS,rep.results)) )
      .catch( error => {
        console.log(error);
        dispatch(send(FAILURE, error));
      });
  };

  function send(status, projects) { return { type: GET_ALL_PROJECTS, status, payload:{projects} } }
}

export function getUserProjects(user) {
  return {
    type: GET_USER_PROJECTS,
    payload: {user}
  }
}

export function createProject(project) {
  return {
    type: CREATE_PROJECT,
    payload: {project}
  }
}

export function addUserToProject(user, projectId) {
  return {
    type: ADD_USER_TO_PROJECT,
    payload: {user, projectId}
  }
}

export function removeUserFromProject(mailId, projectId) {
  return {
    type: REMOVE_USER_FROM_PROJECT,
    payload: {mailId, projectId}
  }
}

export function updateProject(project) {
  return {
    type: UPDATE_PROJECT,
    payload: {project}
  }
}

export function deleteProject(projectId) {
  return {
    type: DELETE_PROJECT,
    payload: {projectId}
  }
}



