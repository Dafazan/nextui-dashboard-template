// firebase.js (or firebaseConfig.js)

import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    }
};

const signUp = async (email, password, username, fullName, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update Firebase Auth profile
    await updateProfile(user, { displayName: username });

    // Save additional user info to Firestore
    await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        fullName,
        role,
    });
};

export { app, auth, db, storage, logout, signUp };


// // Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAuth, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { getStorage } from "firebase/storage"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// const logout = async () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//         try {
//             await signOut(auth);
//         } catch (error) {
//             console.error("Error signing out: ", error);
//         }
//     }
// };

// const signUp = async (email, password, username, fullName, role) => {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Update Firebase Auth profile
//     await updateProfile(user, { displayName: username });

//     // Save additional user info to Firestore
//     await setDoc(doc(db, 'users', user.uid), {
//         username,
//         email,
//         fullName,
//         role,

//     });
// };

// export { logout, signUp };