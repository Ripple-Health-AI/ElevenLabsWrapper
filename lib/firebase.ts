import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgz4hEqGXXhf5qS5yMcMB8BiQrUtxlF7A",
  authDomain: "eleven-labs-wrapper.firebaseapp.com",
  projectId: "eleven-labs-wrapper",
  storageBucket: "eleven-labs-wrapper.firebasestorage.app",
  messagingSenderId: "694721678762",
  appId: "1:694721678762:web:2000735dc9aa8f1de52fd3",
  measurementId: "G-XKRDFNVCWV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);