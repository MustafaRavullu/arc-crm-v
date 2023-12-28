// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0mg2mSt6NLJ43qFFTdg-c5zghO97BsoI",
  authDomain: "arc-crm-8aa30.firebaseapp.com",
  projectId: "arc-crm-8aa30",
  storageBucket: "arc-crm-8aa30.appspot.com",
  messagingSenderId: "234033066641",
  appId: "1:234033066641:web:d13c7bdd957446af184530",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
