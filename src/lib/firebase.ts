import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { type Readable, derived } from "svelte/store";
import { userStore, docStore } from "sveltefire";
import firebaseConfig from './firebaseConfig.json';

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const user = userStore(auth);

// Extra user data beyond what auth provides
interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  published: boolean;
  links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  if ($user) {
    console.log('firebase.ts userData $user', $user);
    return docStore<UserData>(firestore, `users/${$user.uid}`).subscribe(set);
  } else {
    set(null);
  }
});

console.log('firebase.ts loaded user', user, 'userData', userData);