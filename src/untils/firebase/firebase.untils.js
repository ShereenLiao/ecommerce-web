// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGRSQIFxp15_bm_35wMl1l-WjbFudMxx0",
  authDomain: "crwn-db-3255a.firebaseapp.com",
  projectId: "crwn-db-3255a",
  storageBucket: "crwn-db-3255a.appspot.com",
  messagingSenderId: "508954655917",
  appId: "1:508954655917:web:4ae6c74ee24cec878d1a24",
  measurementId: "G-SFCG0R8LFF",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);


  if (userSnapshot.exists()) {
    console.log("Document data:", userSnapshot.data());
  } else {
    const {displayName, email} = userAuth;
    const createAt = new Date();

    await setDoc(userDocRef, {
        displayName,
        email,
        createAt
    });
  }
  return userDocRef;

};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore(firebaseApp);
