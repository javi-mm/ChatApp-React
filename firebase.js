import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhKzFpI1EPhZd6L4vvZw9J7FeOhnc9BXc",
  authDomain: "chatapp-21889.firebaseapp.com",
  projectId: "chatapp-21889",
  storageBucket: "chatapp-21889.appspot.com",
  messagingSenderId: "927046433456",
  appId: "1:927046433456:web:2cade8439f379371cd9975",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, db, provider, auth };
