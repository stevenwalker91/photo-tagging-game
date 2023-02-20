import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7V7nsNbbV5dFX-iAS1TAA8VC4y2Q6t6w",
  authDomain: "photo-tagging-3b7a7.firebaseapp.com",
  projectId: "photo-tagging-3b7a7",
  storageBucket: "photo-tagging-3b7a7.appspot.com",
  messagingSenderId: "331159779811",
  appId: "1:331159779811:web:79d3cd6c0c5e86b05388d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


export {db}