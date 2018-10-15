import {GET_ALL_PROJECTS} from "../actions/action.types";

export default (state = {project:null}, action) => {

  switch (action.type) {
    case GET_ALL_PROJECTS:
      return {project:'getallproject'};
    default:
      return state;
  }
};
