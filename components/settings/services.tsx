"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/db/firebase";
import { TextField } from "@mui/material";

interface Content {
  solution: string;
  farmtech: string;
  solutiondesc: string;
  farmtechdesc: string;
}

function Services() {
  const [service1, setService1] = useState<string>("");
  const [service2, setService2] = useState<string>("");
  const [servicedesc1, setServicedesc1] = useState<string>("");
  const [servicedesc2, setServicedesc2] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "site_content", "texts_services");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Content;
        setService1(data.solution);
        setService2(data.farmtech);
        setServicedesc1(data.solutiondesc);
        setServicedesc2(data.farmtechdesc);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  const updateData = async (e: FormEvent) => {
    e.preventDefault();

    const docRef = doc(db, "site_content", "texts_services");

    try {
      await updateDoc(docRef, {
        solution: service1,
        farmtech: service2,
        solutiondesc: servicedesc1,
        farmtechdesc: servicedesc2,
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
        <div className="flex flex-col gap-3 w-full">
          <TextField
            id="outlined-basic"
            label="Services 1"
            variant="outlined"
            sx={{ width: "100%" }}
            required
            value={service1}
            onChange={(e) => setService1(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Service Description"
            multiline
            rows={4}
            value={servicedesc1}
            sx={{ width: "100%" }}
            onChange={(e) => setServicedesc1(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <TextField
            id="outlined-basic"
            label="Services 2"
            variant="outlined"
            sx={{ width: "100%" }}
            required
            value={service2}
            onChange={(e) => setService2(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Service Description"
            multiline
            rows={4}
            sx={{ width: "100%" }}
            value={servicedesc2}
            onChange={(e) => setServicedesc2(e.target.value)}
            required
          />
        </div>
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

export default Services;
