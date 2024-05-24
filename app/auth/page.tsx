import React from "react";
import { TextField, Container, Typography, Box } from "@mui/material";

function Auth() {
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
              fullWidth
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
            />
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Auth;
