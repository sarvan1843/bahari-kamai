import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHTDlhnaVPJKz7As7pZiN1VRpzrHE9YSU",
  authDomain: "bahari-kamai.firebaseapp.com",
  projectId: "bahari-kamai",
  storageBucket: "bahari-kamai.firebasestorage.app",
  messagingSenderId: "810207525601",
  appId: "1:810207525601:web:59cb00ed3f973467f6d5a0",
  measurementId: "G-6929FR9T1H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
