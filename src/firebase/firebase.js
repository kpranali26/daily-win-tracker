import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyBmG1ItVKNqIIgHc4LKMBp5Qy20Vm2onYA",
  authDomain: "daily-win-tracker.firebaseapp.com",
  projectId: "daily-win-tracker",
  storageBucket: "daily-win-tracker.firebasestorage.app",
  messagingSenderId: "154083101711",
  appId: "1:154083101711:web:bf98661975c877a23ee77a",
  measurementId: "G-F1ZS57EMHD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Export db so you can use it in Firestore operations
