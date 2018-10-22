import {SET_CURRENT_USER, TOGGLE_THEME} from './action.types'

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: {user}
  }
}

export function toggleTheme() {
  return {
    type: TOGGLE_THEME,
  }
}


