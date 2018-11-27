import {FAILURE, REQUEST, SET_CURRENT_USER, SUCCESS, TOGGLE_THEME} from './action.types'


export function toggleTheme() {
  return {
    type: TOGGLE_THEME,
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: {user}
  }
}