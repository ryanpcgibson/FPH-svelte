// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBKWwo9WOL_JYwbclcwBiLf_eIYy9_DTOQ",
  authDomain: "family-pet-history.firebaseapp.com",
  projectId: "family-pet-history",
  storageBucket: "family-pet-history.appspot.com",
  messagingSenderId: "329100711747",
  appId: "1:329100711747:web:bc6bed0a11e6a7b54741f6",
  measurementId: "G-PPQXVQH6GK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);