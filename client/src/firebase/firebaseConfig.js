// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "portfolio-4e340.firebaseapp.com",
  projectId: "portfolio-4e340",
  storageBucket: "portfolio-4e340.appspot.com",
  messagingSenderId: "386598710194",
  appId: "1:386598710194:web:31f368eb7521303e3d12ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
