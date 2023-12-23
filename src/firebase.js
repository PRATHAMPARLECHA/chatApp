import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx-3q96G_X_yrEYljc5jTFimWgJaCKiAA",
  authDomain: "chatapp-8f44d.firebaseapp.com",
  projectId: "chatapp-8f44d",
  storageBucket: "chatapp-8f44d.appspot.com",
  messagingSenderId: "1048331341734",
  appId: "1:1048331341734:web:b47cb99557152592048967"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
