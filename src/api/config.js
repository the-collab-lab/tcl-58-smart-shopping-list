import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdn_V21Ei8pJCAmR17I6aDw532bzl1A-o",
  authDomain: "tcl-58-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-58-smart-shopping-list",
  storageBucket: "tcl-58-smart-shopping-list.appspot.com",
  messagingSenderId: "948119917256",
  appId: "1:948119917256:web:c891024cae111d487d0bfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
