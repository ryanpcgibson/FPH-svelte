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

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);