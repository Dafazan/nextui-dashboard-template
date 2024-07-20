"use client";
import React, { useState, useEffect } from "react";
import { signUp } from "@/app/db/firebase";
import Account from "../account/page";
import { AddUser } from "@/components/accounts/add-user";
import { Accounts } from "@/components/accounts";
import { Button, Input } from "@nextui-org/react";
import { db, storage } from "@/app/db/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Users {
  email: string;
  username: string;
  fullName: string;
  role: string;
  id: string;
}

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [dataUsers, setDataUsers] = useState<Users[]>([]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signUp(email, password, username, fullName, role);
      alert("User created successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    getDataUsers();
  }, []);
  async function getDataUsers() {
    try {
      const ordersRef = collection(db, "users");
      const q = query(ordersRef, orderBy("username"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No documents found.");
        return;
      }

      let data: Users[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...(doc.data() as Users), id: doc.id });
      });
      setDataUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [hasTargetUid, setHasTargetUid] = useState(false);
  const targetUid = "t7QQWKwjORhobvD3PEwBIYaVeEf2"; // Replace with the UID you want to check

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setHasTargetUid(user.uid === targetUid);
      } else {
        setHasTargetUid(false);
      }
      setIsAuthChecked(true);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [targetUid]);

  return (
    <>
      {hasTargetUid ? (
        <>
          <p className="text-[#ffffff] font-bold text-xl ps-5 mt-5">
            REGISTER NEW ACCOUNTS
          </p>
          <form className="p-5 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <p className="ps-1">Username</p>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                classNames={{
                  input: "w-full",
                  mainWrapper: "w-full",
                }}
                placeholder="Input Username"
              />
            </div>
            <div className="flex flex-col">
              <p className="ps-1">Full Name</p>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                classNames={{
                  input: "w-full",
                  mainWrapper: "w-full",
                }}
                placeholder="Input Full Name"
              />
            </div>
            <div className="flex flex-col">
              <p className="ps-1">Email</p>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                classNames={{
                  input: "w-full",
                  mainWrapper: "w-full",
                }}
                placeholder="Input Email"
              />
            </div>
            <div className="flex flex-col">
              <p className="ps-1">Password</p>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                classNames={{
                  input: "w-full",
                  mainWrapper: "w-full",
                }}
                placeholder="Input Password"
              />
            </div>
            <div className="flex flex-col">
              <p className="ps-1">Role</p>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                classNames={{
                  input: "w-full",
                  mainWrapper: "w-full",
                }}
                placeholder="Input Role"
              />
            </div>
            <div className="flex flex-col">
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 rounded-xl h-full mt-6"
              >
                REGISTER
              </button>
            </div>
          </form>
          <div className="px-5">
            <p className="text-[#ffffff] font-bold text-xl  mt-10">
              REGISTERED ACCOUNTS
            </p>
          </div>
          <div className="p-5 flex flex-col gap-2">
            <div className="bg-[#1e1e1e] w-full h-full rounded-xl text-white p-2 grid grid-cols-4">
              <p>Username</p>
              <p>Full Name</p>
              <p>Email</p>
              <p>Role</p>
            </div>
            {dataUsers.map((data, i) => (
              <>
                <div className="bg-[#1e1e1e] w-full h-full rounded-xl text-white p-2 grid grid-cols-4">
                  <p>{data.username}</p>
                  <p>{data.fullName}</p>
                  <p>{data.email}</p>
                  <p>{data.role}</p>
                </div>
              </>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="p-5">
            <p>Gabisa cuy harus admin</p>
          </div>
        </>
      )}
    </>
  );
};

export default SignUpForm;
