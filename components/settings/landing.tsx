"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/db/firebase";
import { TextField } from "@mui/material";

interface Content {
  tagline: string;
  tagline_2nd: string;
}

function Landing() {
  const [tagline, setTagline] = useState<string>("");
  const [tagline_2nd, setTagline_2nd] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "site_content", "texts_primary");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Content;
        setTagline(data.tagline);
        setTagline_2nd(data.tagline_2nd);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  const updateData = async (e: FormEvent) => {
    e.preventDefault();

    const docRef = doc(db, "site_content", "texts_primary");

    try {
      await updateDoc(docRef, {
        tagline: tagline,
        tagline_2nd: tagline_2nd,
      });
      alert("Update successful");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating document");
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-sm p-5 gap-3">
      <div className="flex gap-3">
        <TextField
          id="outlined-multiline-static"
          label="Tagline"
          value={tagline}
          multiline
          rows={4}
          sx={{ width: "100%" }}
          onChange={(e) => setTagline(e.target.value)}
          required
        />
        <TextField
          id="outlined-multiline-static"
          label="Secondary"
          value={tagline_2nd}
          multiline
          rows={4}
          sx={{ width: "100%" }}
          onChange={(e) => setTagline_2nd(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-blue-500 rounded-md p-2 text-white font-semibold"
        onClick={updateData}
      >
        SAVE
      </button>
    </div>
  );
}

export default Landing;
