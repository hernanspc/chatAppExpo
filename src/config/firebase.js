import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants"

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyCdDE9g98EyqRo5vfW8g30FPQr1n7jQKRE",
    apiKey: Constants.manifest.extra.apiKey,
    // authDomain: "chatapp-5b511.firebaseapp.com",
    authDomain: Constants.manifest.extra.authDomain,
    // projectId: "chatapp-5b511",
    projectId: Constants.manifest.extra.projectId,
    // storageBucket: "chatapp-5b511.appspot.com",
    storageBucket: Constants.manifest.extra.storageBucket,
    // messagingSenderId: "428897885947",
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    // appId: "1:428897885947:web:3eee55f0644c698d111a5e"
    appId: Constants.manifest.extra.appId,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();