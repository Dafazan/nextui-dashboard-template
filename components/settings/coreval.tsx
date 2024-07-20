"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/db/firebase";
import { TextField } from "@mui/material";

interface Content {
  amanah: string;
  loyal: string;
  innovative: string;
  visioner: string;
  enthusiastic: string;
  solutive: string;
}

function Coreval() {
  const [amanah, setAmanah] = useState<string>("");
  const [loyal, setLoyal] = useState<string>("");
  const [innovative, setInnovative] = useState<string>("");
  const [visioner, setVisioner] = useState<string>("");
  const [enthusiastic, setEnthusiastic] = useState<string>("");
  const [solutive, setSolutive] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "site_content", "texts_core_value");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Content;
        setAmanah(data.amanah);
        setLoyal(data.loyal);
        setInnovative(data.innovative);
        setVisioner(data.visioner);
        setEnthusiastic(data.enthusiastic);
        setSolutive(data.solutive);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  const updateData = async (e: FormEvent) => {
    e.preventDefault();

    const docRef = doc(db, "site_content", "texts_core_value");

    try {
      await updateDoc(docRef, {
        amanah: amanah,
        loyal: loyal,
        innovative: innovative,
        visioner: visioner,
        enthusiastic: enthusiastic,
        solutive: solutive,
      });
      alert("Update successful");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating document");
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-sm p-5 gap-3">
      <TextField
        id="outlined-multiline-static"
        label="Amanah"
        multiline
        rows={4}
        sx={{ width: "100%" }}
        onChange={(e) => setAmanah(e.target.value)}
        required
        value={amanah}
      />
      <TextField
        id="outlined-multiline-static"
        label="Loyal"
        multiline
        rows={4}
        sx={{ width: "100%" }}
        onChange={(e) => setLoyal(e.target.value)}
        required
        value={loyal}
      />
      <TextField
        id="outlined-multiline-static"
        label="Innovative"
        multiline
        rows={4}
        sx={{ width: "100%" }}
        onChange={(e) => setInnovative(e.target.value)}
        required
        value={innovative}
      />
      <TextField
        id="outlined-multiline-static"
        label="Visioner"
        multiline
        rows={4}
        sx={{ width: "100%" }}
        onChange={(e) => setVisioner(e.target.value)}
        required
        value={visioner}
      />
      <TextField
        id="outlined-multiline-static"
        label="Enthusiastic"
        multiline
        rows={4}
        sx={{ width: "100%" }}
        onChange={(e) => setEnthusiastic(e.target.value)}
        required
        value={enthusiastic}
      />
      <TextField
        id="outlined-multiline-static"
        label="Solutive"
        multiline
        rows={4}
        sx={{ width: "100%" }}
        onChange={(e) => setSolutive(e.target.value)}
        required
        value={solutive}
      />
      <button
        className="bg-blue-500 rounded-md p-2 text-white font-semibold"
        onClick={updateData}
      >
        SAVE
      </button>
    </div>
  );
}

export default Coreval;
