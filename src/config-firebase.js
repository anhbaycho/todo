import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCYULqPkqJ5hfKufRmdNR8p5RHSWYOULD8",
  authDomain: "todo-siuu.firebaseapp.com",
  projectId: "todo-siuu",
  storageBucket: "todo-siuu.appspot.com",
  messagingSenderId: "525994661510",
  appId: "1:525994661510:web:8daf4fe9f810d1720fa307",
  measurementId: "G-RDM3KL0DM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
