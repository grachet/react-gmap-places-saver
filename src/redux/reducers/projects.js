import {ADD_PROJECT, FETCH_PROJECTS, REMOVE_PROJECT, UPDATE_PROJECT} from '../actions/action.types'

export default (state = null, action) => {

  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload;
    default:
      return state;
  }
}
