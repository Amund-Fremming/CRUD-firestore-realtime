import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVeq4RbJcsttjc079N7ub42Q8i1FNuQZg",
  authDomain: "firestore-crud-cc4c7.firebaseapp.com",
  projectId: "firestore-crud-cc4c7",
  storageBucket: "firestore-crud-cc4c7.appspot.com",
  messagingSenderId: "911861679464",
  appId: "1:911861679464:web:253af5baa8e9f855b5c2dd",
  measurementId: "G-D21Y61N3L3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);