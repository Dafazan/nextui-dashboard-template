"use client";
import React from "react";
import { TextField, Container, Typography, Box } from "@mui/material";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/db/firebase";

function Auth() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Submit = async (e: any) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login Berhasil");

        push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode);
      });
    e.preventDefault();
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Container className="flex justify-center items-center">
        <Box
          className=" bg-[#d0d0d0] rounded-lg"
          padding={5}
          width={500}
          my={4}
        >
          <Typography color="#000000" variant="h4" component="h1" gutterBottom>
            Welcome
          </Typography>
          <form noValidate autoComplete="off" className="flex flex-col gap-5">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </form>
          <button
            className="bg-blue-500 p-3 rounded-md w-full mt-3"
            onClick={(e) => Submit(e)}
          >
            LOGIN
          </button>
        </Box>
      </Container>
    </div>
  );
}

export default Auth;
