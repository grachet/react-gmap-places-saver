import {
  ADD_USER_TO_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_USER_PROJECTS,
  REMOVE_USER_FROM_PROJECT,
  UPDATE_PROJECT,
} from './action.types'
import {deleteDocById, getView, insertDoc, removeAttributeFromDoc} from './async'

export const createProject = (project) => insertDoc(CREATE_PROJECT, project);

export const getUserProjects = (userId) => getView(GET_USER_PROJECTS, "js", "user-projects", {keys: [userId]}, true);

export const deleteProject = (projectId, rev) => deleteDocById(DELETE_PROJECT, projectId, rev);

export const addUserToProject = (user, project) => insertDoc(ADD_USER_TO_PROJECT, {
  ...project,
  users: {...project.users, [user._id]: user}
});

export const updateProject = (project) => insertDoc(UPDATE_PROJECT, project, project._id, true);

export const removeUserFromProject = (userId, project) => removeAttributeFromDoc(REMOVE_USER_FROM_PROJECT, project, ["users", userId]);




