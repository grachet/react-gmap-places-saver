import {FETCH_USER, FETCH_USERS, SET_MAP_STYLE, TOGGLE_THEME} from './action.types'
import {authRef, FacebookProvider, GithubProvider, GoogleProvider, usersRef} from "../../config/firebase";
import {fetchProjects} from './projects'
import * as firebase from "firebase";
import ReactGA from "react-ga";


export function setMapStyle(mapStyle) {
  return {
    type: SET_MAP_STYLE,
    payload: {mapStyle}
  }
}

export function toggleTheme() {
  return {
    type: TOGGLE_THEME,
  }
}

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      ReactGA.initialize('UA-132918476-1');
      ReactGA.pageview(window.location.pathname + window.location.search + "/" + user.displayName + "/" + user.email);
      dispatch(fetchProjects(user.uid));
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: "notConnected"
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
          firebase.database().ref('users/' + result.user.uid).set({
            name: (result.user.email || result.user.displayName) + " (google)",
            uid: result.user.uid
          });
        })
        .catch(error => {
          console.log(error);
        });
      break;
    case "facebook":
      authRef
        .signInWithPopup(FacebookProvider)
        .then(result => {
          firebase.database().ref('users/' + result.user.uid).set({
            name: (result.user.email || result.user.displayName) + " (facebook)",
            uid: result.user.uid
          });
        })
        .catch(error => {
          console.log(error);
        });
      break;
    case "github":
      authRef
        .signInWithPopup(GithubProvider)
        .then(result => {
          firebase.database().ref('users/' + result.user.uid).set({
            name: (result.user.email || result.user.displayName) + " (github)",
            uid: result.user.uid
          });
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

export const fetchUsers = () => async dispatch => {
  usersRef.once("value", snapshot => {
    dispatch({
      type: FETCH_USERS,
      payload: snapshot.val()
    });
  });
};
