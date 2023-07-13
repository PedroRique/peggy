// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTibYe1I54EqpM1pYBEXyPm2OXuSU5gjQ",
  authDomain: "peggy-app.firebaseapp.com",
  projectId: "peggy-app",
  storageBucket: "peggy-app.appspot.com",
  messagingSenderId: "971958831382",
  appId: "1:971958831382:web:79d3964ed9000169c3e837",
  measurementId: "G-DKNJPDWT1E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(app);
export const FIREBASE_STORAGE = getStorage(app);
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
