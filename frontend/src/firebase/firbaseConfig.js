import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyBTZzAWsitlDdcQ323pEg3VkcKT4-x0xNs",
  authDomain: "drivee-e25e2.firebaseapp.com",
  projectId: "drivee-e25e2",
  storageBucket: "drivee-e25e2.firebasestorage.app",
  messagingSenderId: "923900939934",
  appId: "1:923900939934:web:31d648a973b0352836758f",
  measurementId: "G-V24W9NB98S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);