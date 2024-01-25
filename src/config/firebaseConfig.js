import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: import.meta.env.REACT_APP_API_KEY,
  // authDomain: import.meta.env.REACT_APP_AUTH_DOMAIN,
  // projectId: import.meta.env.REACT_APP_PROJECT_ID,
  // storageBucket: import.meta.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: import.meta.env.REACT_APP_ID,
  apiKey: "AIzaSyCPSS_2Dzw1lxr2_vYqSbvH4c6IJ8y4XPQ",
  authDomain: "efurniture-46a6d.firebaseapp.com",
  projectId: "efurniture-46a6d",
  storageBucket: "efurniture-46a6d.appspot.com",
  messagingSenderId: "317363201908",
  appId: "1:317363201908:web:ff6b97659db9c336ba2e21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
