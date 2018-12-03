import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database().ref();
export const projectsRef = databaseRef.child("projects");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();