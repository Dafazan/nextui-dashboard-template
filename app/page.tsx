"use client";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import { redirect, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./db/firebase";

const Home: NextPage = () => {
  const [isLoginSuceed, setIsLoginSuceed] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoginSuceed(true);
      }
    });
  }, []);

  return (
    <>
      {isLoginSuceed ? (
        <>
          <div className="p-5">
            <p>Kosong</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
