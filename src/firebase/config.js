import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-10b73.firebaseapp.com",
  projectId: "eshop-10b73",
  storageBucket: "eshop-10b73.appspot.com",
  messagingSenderId: "421143885545",
  appId: "1:421143885545:web:48492881ccf22e1a3fa278"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;