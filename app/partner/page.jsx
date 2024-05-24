"use client";
import Pcards from "@/components/portfolios/card";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CliCard from "@/components/clients/card";

import { db, storage } from "@/app/db/firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc

} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { redirect, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/db/firebase";

function Partner() {
  const [isLoginSuceed, setIsLoginSuceed] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoginSuceed(true);
      }
    });
  }, []);

   //data partner_saptaloka
  const [partner, setPartner] = useState([]);
  const [title, setTitle] = useState("");
  //data input
  const [downloadURL, setDownloadURL] = useState("");
  //loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataPartner();
  }, []);


  const getDataPartner = async () => {
    try {
      const ordersRef = collection(db, "partner_saptaloka");
      const q = query(ordersRef, orderBy("title"));
      const querySnapshot = await getDocs(q);
      let data = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data.push({ ...doc.data(), id: doc.id });
      });
      setPartner(data);
    } catch (error) {
      alert(error);
    }
  };

  const addData = async (e) => {
    e.preventDefault();
    
    const docRef = await addDoc(collection(db, "partner_saptaloka"), {
      img: downloadURL,
      title: title,

    });

    alert("success");
  };

  const handleUpload = async (filess) => {
    const files = filess;
    try {
      setLoading(true);
      const storageRef = ref(storage, `/partner_saptaloka/${files.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );


        },
        (err) => console.log(err),
        () => {
          // download url

          getDownloadURL(uploadTask.snapshot.ref).then((url) => {

            setDownloadURL(url);
            setLoading(false);
          });
        }
      );
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const [isClient, setIsclient] =useState();
    useEffect(() => {
   setIsclient(true);
  }, []);

  
  return (
    <>
    {isLoginSuceed? (<>
    <div className="p-5 flex flex-col gap-5">
     {isClient ==true? <>
      <Box
        className="bg-white rounded-md p-5 w-full"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
      
        <div className="w-full">
          <p className="text-[#333333] font-bold text-xl mx-2">
            Add New Partner
          </p>
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            sx={{ width: "100%" }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="mx-2 text-[#333333]">Select Image</p>
          <div className="flex justify-between items-center">
            <input
              className="mx-2 text-[#333333]"
              type="file"
             onChange={(event) => handleUpload(event.target.files[0])}
            />
            {loading ? (
              <button className="bg-blue-500 px-8 py-2 rounded-md">
              KALEM EUY 
            </button>
            ) : (
               <button onClick={addData} className="bg-blue-500 px-8 py-2 rounded-md">
              SUBMIT PARTNER
            </button>
            )}
           
          </div>
        </div>
      </Box>
      <div className="px-2">
        <p className="text-[#ffffff] font-bold text-xl">ADDED PARTNER</p>
      </div>
      <div className="grid grid-cols-4 gap-5">
         {
          partner.map((data, i) => {
            return (
             
                 <CliCard key={i} title={data.title} img={data.img} del={async (e) => {
                  try {
                    // Delete the todo document with the given ID from the "todos" collection in Firestore.
                    await deleteDoc(
                      doc(db, "partner_saptaloka", data.id)
                    );
                    alert("delete success");


                  } catch (error) {
                    alert("An error occured", error);
                  }
                }} />
               
            )
          })
        }
      </div>
     </>:null}
    </div>
      </>):null}
    </>
  );
}

export default Partner;
