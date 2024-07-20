"use client";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { db, storage } from "@/app/db/firebase";
import Photoup from "@/components/accounts/uploadphoto";

interface UserData {
  email: string;
  username: string;
  fullName: string;
  role: string;
  img?: string; // Make the img field optional
}
function Greetings() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (!userDoc.exists()) {
            console.log("No document found for the current user.");
            return;
          }

          const userData = userDoc.data() as UserData;
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {userData ? (
        <>
          <p>Hallo pak {userData.username}</p>
        </>
      ) : (
        <p>?</p>
      )}
    </>
  );
}

export default Greetings;
