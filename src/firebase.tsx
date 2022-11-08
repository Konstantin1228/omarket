import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJz5Ic9YyLEqfa5ra0TZeKNAt28nX1vPk",
    authDomain: "heroic-gantry-362610.firebaseapp.com",
    databaseURL: "https://heroic-gantry-362610-default-rtdb.firebaseio.com",
    projectId: "heroic-gantry-362610",
    storageBucket: "heroic-gantry-362610.appspot.com",
    messagingSenderId: "5344425166",
    appId: "1:5344425166:web:7dd69ab950249e31490c9f",
    measurementId: "G-17SKJZ4Y9K"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app)