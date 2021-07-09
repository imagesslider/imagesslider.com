import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBvK9JeT8olnnsKN5ZgSE4albBrKD8vHgg",
  authDomain: "images-b71e6.firebaseapp.com",
  databaseURL: "https://images-b71e6-default-rtdb.firebaseio.com",
  projectId: "images-b71e6",
  storageBucket: "images-b71e6.appspot.com",
  messagingSenderId: "1029593901210",
  appId: "1:1029593901210:web:3c5854218add3998981723",
  measurementId: "G-RXWB0PW809",
});

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
export default app;
