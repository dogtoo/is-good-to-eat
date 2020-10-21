import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtZ-3rAtWBlLSJY5Mt0Okxg7aM00eN7L8",
  authDomain: "is-good-to-eat.firebaseapp.com",
  databaseURL: "https://is-good-to-eat.firebaseio.com",
  projectId: "is-good-to-eat",
  storageBucket: "is-good-to-eat.appspot.com",
  messagingSenderId: "777737522166",
  appId: "1:777737522166:web:1fcb10628a73d8a75a55d7",
  measurementId: "G-5DR43ERZNH"
};

let db;
let auth;
let storage;
try {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  db = firebaseApp.firestore();
  auth = firebase.auth();
  storage = firebase.storage();
} catch (error) {
  // ...
}
export {db, auth, storage};
