import user from "./user";
import projects from "./projects";
import {combineReducers} from 'redux';

export default combineReducers({
  user,
  projects,
});
