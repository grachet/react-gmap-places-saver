import { TOGGLE_THEME, FETCH_USER} from './action.types'
import { authRef, GithubProvider,GoogleProvider,FacebookProvider,EmailProvider } from "../../config/firebase";
import * as firebase from "firebase";


export function toggleTheme() {
  return {
    type: TOGGLE_THEME,
  }
}

export const addUserInDatabase = (user,uid) => async dispatch => {
  firebase.database().ref('users/' + (uid || user.uid )).set(user);
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};


export const signIn = (provider) => dispatch => {
  switch (provider) {
    case "google":
      authRef
        .signInWithPopup(GoogleProvider)
        .then(result => {
          console.log("result", result);
          addUserInDatabase(result)})
        .catch(error => {
          console.log(error);
        });
      break;
    case "facebook":
      authRef
        .signInWithPopup(FacebookProvider)
        .then(result => {})
        .catch(error => {
          console.log(error);
        });
      break;
    case "github":
      authRef
        .signInWithPopup(GithubProvider)
        .then(result => {})
        .catch(error => {
          console.log(error);
        });
      break;
    case "anonymous":
      authRef
        .signInAnonymously()
        .then(result => {})
        .catch(error => {
          console.log(error);
        });
      break;
  }
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};