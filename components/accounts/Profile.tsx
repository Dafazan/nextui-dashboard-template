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

function MyProfile() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [newImg, setNewImg] = useState<string>(""); // State to hold the new image URL

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

  const handleImgChange = async () => {
    if (!user || !userData) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { ...userData, img: newImg }, { merge: true });
      setUserData({ ...userData, img: newImg }); // Update local state
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };
  const [hoverimg, setHoverimg] = useState(false);
  function Handlehoverimg() {
    setHoverimg(true);
  }
  function Handlehoverimgx() {
    setHoverimg(false);
  }
  const [hoverimgup, setHoverimgup] = useState(false);
  function Handlehoverimgup() {
    setHoverimgup(true);
  }
  function Handlehoverimgxup() {
    setHoverimgup(false);
  }

  return (
    <div className="w-full">
      <div className="absolute z-50  w-full flex justify-center p-10">
        {hoverimgup ? (
          <>
            <div className="bg-black w-[500px] rounded-md bg-opacity-50 p-5 flex flex-col gap-5">
              <Photoup />
              <div className="flex justify-between w-full gap-2">
                <input
                  className="w-full"
                  type="text"
                  value={newImg}
                  onChange={(e) => setNewImg(e.target.value)}
                />
                <button
                  className="bg-blue-500 p-2 rounded-md w-full "
                  onClick={handleImgChange}
                >
                  Save From URL
                </button>
              </div>
              <button
                onClick={Handlehoverimgxup}
                className="bg-red-500 p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="w-full bg-white p-5 rounded-md">
        <div className="flex gap-3">
          <div
            onMouseEnter={Handlehoverimg}
            onMouseLeave={Handlehoverimgx}
            className="h-32 w-32"
          >
            {userData?.img ? (
              <div className="relative">
                {hoverimg ? (
                  <>
                    <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-30">
                      <button
                        onClick={Handlehoverimgup}
                        className="bg-blue-500 p-2 rounded-md"
                      >
                        Change
                      </button>
                    </div>
                  </>
                ) : null}
                <img
                  className="rounded-md"
                  src={userData.img}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col justify-between text-black text-xl">
              <p>Name</p>
              <p>Username</p>
              <p>Role</p>
              <p>Email</p>
            </div>
            <div className="flex flex-col justify-between text-black text-xl">
              {userData ? (
                <>
                  <p>: {userData.fullName}</p>
                  <p>: {userData.username}</p>
                  <p>: {userData.role}</p>
                  <p>: {userData.email}</p>
                </>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
