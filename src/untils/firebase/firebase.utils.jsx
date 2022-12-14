import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
} from "firebase/firestore";

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

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const auth = getAuth();
export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCollectionAndDocuments = async (collectionKey) => {
  const querySnapshot = await getDocs(collection(db, collectionKey));
  const categoryArray = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  const categoryMap=categoryArray.reduce((acc, category) => {
    acc[category.title.toLowerCase()]=category.items;
    return acc;
},{})
  return categoryMap;
};

provider.setCustomParameters({
  prompt: "select_account",
});

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) {
    throw new Error("Didn't get user authentication token.");
  }

  const userDocRef = doc(db, "users", userAuth.uid);

  getDoc(userDocRef)
    .then((userSnapshot) => {
      //if use already signed up
      if (userSnapshot.exists()) {
        console.log("Document data:", userSnapshot.data());
      } else {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        return setDoc(userDocRef, {
          displayName,
          email,
          createAt,
          ...additionalInformation,
        });
      }
    })
    .catch((e) => {
      console.log("error creating the user", e.message);
    });
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) throw new Error("Email or password is not filled");

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) throw new Error("Email or password is not filled");

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);