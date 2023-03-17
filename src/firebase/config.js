// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsfV3Lut9Yb7KDSCmFrQXomo_LtufzYus",
  authDomain: "react-project-1a59f.firebaseapp.com",
  projectId: "react-project-1a59f",
  storageBucket: "react-project-1a59f.appspot.com",
  messagingSenderId: "1094575981664",
  appId: "1:1094575981664:web:ae685120817859c96e6f05"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export   const db = getFirestore(app);