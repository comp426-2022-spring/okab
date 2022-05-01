import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCpspyJBziegUr-XlHfRRiEol1qKqLSzP0",
    authDomain: "okab-6a8ac.firebaseapp.com",
    projectId: "okab-6a8ac",
    storageBucket: "okab-6a8ac.appspot.com",
    messagingSenderId: "935513642014",
    appId: "1:935513642014:web:457bcd1dd20bc60caaca0f",
    measurementId: "G-8978S7Z8XF"
  };

// Initialize app and auth
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const User = collection(db, "Users");