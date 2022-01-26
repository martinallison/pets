import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC47AhwGv467zEEpRo_5tutXMiVrb2DAjY",
  authDomain: "pet-things-83b52.firebaseapp.com",
  projectId: "pet-things-83b52",
  storageBucket: "pet-things-83b52.appspot.com",
  messagingSenderId: "199077838857",
  appId: "1:199077838857:web:9eb10ce98514aff3ab78d8",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const signIn = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};
export const signOut = () => {
  auth.signOut();
};

export const db = getFirestore();
