import user from "./user";
import projects from "./projects";
import manager from "./manager";
import {combineReducers} from 'redux';

export default combineReducers({
  user,
  projects,
  manager
});
