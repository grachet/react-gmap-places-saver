import user from "./user";
import projects from "./projects";
import courses from "./courses";
import documents from "./documents";
import modules from "./modules";
import activeProject from "./activeProject";
import {combineReducers} from 'redux';

export default combineReducers({
  user,
  projects,
  modules,
  documents,
  courses,
  activeProject
});
