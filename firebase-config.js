import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5hngNPFgUnF5vgZUzCmMW_C5GRI7HFvk",
  authDomain: "shop-brain-71ece.firebaseapp.com",
  projectId: "shop-brain-71ece",
  storageBucket: "shop-brain-71ece.firebasestorage.app",
  messagingSenderId: "825830092427",
  appId: "1:825830092427:web:f63b6b8d44f2ac3e4dee8e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };