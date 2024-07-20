import { db } from "@/app/db/firebase";
import { TextField } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { FormEvent, useEffect, useState } from "react";

interface Content {
  address: string;
  email: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  youtube: string;
  whatsapp: string;
}

function Details() {
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "site_content", "texts_primary");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Content;

        setAddress(data.address);
        setEmail(data.email);
        setLinkedin(data.linkedin);
        setInstagram(data.instagram);
        setFacebook(data.facebook);
        setYoutube(data.youtube);
        setWhatsapp(data.whatsapp);
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
        address: address,
        email: email,
        linkedin: linkedin,
        instagram: instagram,
        facebook: facebook,
        youtube: youtube,
        whatsapp: whatsapp,
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
        label="Address"
        multiline
        rows={4}
        sx={{ width: "100%" }}
        onChange={(e) => setAddress(e.target.value)}
        required
        value={address}
      />
      <TextField
        id="outlined-multiline-static"
        label="Email"
        multiline
        sx={{ width: "100%" }}
        onChange={(e) => setEmail(e.target.value)}
        required
        value={email}
      />
      <TextField
        id="outlined-multiline-static"
        label="LinkedIn"
        multiline
        sx={{ width: "100%" }}
        onChange={(e) => setLinkedin(e.target.value)}
        required
        value={linkedin}
      />
      <TextField
        id="outlined-multiline-static"
        label="Instagram"
        multiline
        sx={{ width: "100%" }}
        onChange={(e) => setInstagram(e.target.value)}
        required
        value={instagram}
      />
      <TextField
        id="outlined-multiline-static"
        label="Facebook"
        multiline
        sx={{ width: "100%" }}
        onChange={(e) => setFacebook(e.target.value)}
        required
        value={facebook}
      />
      <TextField
        id="outlined-multiline-static"
        label="Youtube"
        multiline
        sx={{ width: "100%" }}
        onChange={(e) => setYoutube(e.target.value)}
        required
        value={youtube}
      />
      <TextField
        id="outlined-multiline-static"
        label="WhatsApp"
        multiline
        sx={{ width: "100%" }}
        onChange={(e) => setWhatsapp(e.target.value)}
        required
        value={whatsapp}
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

export default Details;
