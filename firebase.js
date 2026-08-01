// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-ZCZQo4jkcRVKh7Ok511ZZkL3SK7nuwY",
  authDomain: "aryan-ai-8280a.firebaseapp.com",
  projectId: "aryan-ai-8280a",
  storageBucket: "aryan-ai-8280a.firebasestorage.app",
  messagingSenderId: "1012688917568",
  appId: "1:1012688917568:web:3eb63bbed3c0aba2dabba5",
  measurementId: "G-8FEBBTHZWN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
};