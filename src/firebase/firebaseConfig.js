import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkXT1NKQ8-iRk5SDGDXcy936yzKOw8cqc",
  authDomain: "fir-app-f803f.firebaseapp.com",
  projectId: "fir-app-f803f",
  storageBucket: "fir-app-f803f.appspot.com",
  messagingSenderId: "883262263482",
  appId: "1:883262263482:web:7b113b312e4aa7c0cbf283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app)
export { auth };
