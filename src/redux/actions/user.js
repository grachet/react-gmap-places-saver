import {FETCH_USER, TOGGLE_THEME} from './action.types'
import {authRef, EmailProvider, FacebookProvider, GithubProvider, GoogleProvider} from "../../config/firebase";
import * as firebase from "firebase";


export function toggleTheme() {
  return {
    type: TOGGLE_THEME,
  }
}

export const addUserInDatabase = (user) => async dispatch => {
  console.log("user", user);
  firebase.database().ref('users/' + user.uid).set(user);
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
          if (!result.user.isAnonymous) {
            addUserInDatabase({
              name: result.user.email || result.user.displayName,
              uid: result.user.uid
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
      break;
    case "facebook":
      authRef
        .signInWithPopup(FacebookProvider)
        .then(result => {
        })
        .catch(error => {
          console.log(error);
        });
      break;
    case "github":
      authRef
        .signInWithPopup(GithubProvider)
        .then(result => {
        })
        .catch(error => {
          console.log(error);
        });
      break;
    case "anonymous":
      authRef
        .signInAnonymously()
        .then(result => {
        })
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