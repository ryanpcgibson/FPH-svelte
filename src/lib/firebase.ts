import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";
import { userStore } from "sveltefire";
import { doc, onSnapshot } from "firebase/firestore";

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

export const user = userStore(auth);


/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;

  const docRef = doc(firestore, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  published: boolean;
  links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  if ($user) {
    return docStore<UserData>(firestore, `users/${$user.uid}`).subscribe(set);
  } else {
    set(null);
  }
});  

console.log('firebase.ts loaded user', user, 'userData', userData);