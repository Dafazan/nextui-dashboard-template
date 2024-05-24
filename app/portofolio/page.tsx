import Pcards from "@/components/portfolios/card";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Portofolio() {
  return (
    <div className="p-5 flex flex-col gap-5">
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
            Add New Portfolio
          </p>
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            sx={{ width: "100%" }}
          />
          <TextField
            id="filled-textarea"
            label="Description"
            placeholder="Placeholder"
            multiline
            variant="filled"
            sx={{ width: "100%" }}
            rows={5}
            // Set width to 100% here
          />
          <p className="mx-2 text-[#333333]">Select Image</p>
          <div className="flex justify-between items-center">
            <input
              className="mx-2 text-[#333333]"
              type="file"
              // onChange={(event) => handleUpload(event.target.files[0])}
            />
            <button type="submit" className="bg-blue-500 px-8 py-2 rounded-md">
              SUBMIT PORTFOLIO
            </button>
          </div>
        </div>
      </Box>
      <div className="px-2">
        <p className="text-[#ffffff] font-bold text-xl">ADDED PORTFOLIO</p>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <Pcards
          title="Porto 1"
          desc=" Ini deskripsi yang ga panjang"
          img="https://cdna.artstation.com/p/assets/images/images/072/923/394/large/dafazan-keyrender1ex.jpg?1708517799"
          del=""
          edit=""
        />
        <Pcards
          title="Porto 1"
          desc=" Ini deskripsi yang ga panjang"
          img="https://cdna.artstation.com/p/assets/images/images/072/923/394/large/dafazan-keyrender1ex.jpg?1708517799"
          del=""
          edit=""
        />
        <Pcards
          title="Porto 1"
          desc=" Ini deskripsi yang ga panjang"
          img="https://cdna.artstation.com/p/assets/images/images/072/923/394/large/dafazan-keyrender1ex.jpg?1708517799"
          del=""
          edit=""
        />
        <Pcards
          title="Porto 1"
          desc=" Ini deskripsi yang ga panjang"
          img="https://cdna.artstation.com/p/assets/images/images/072/923/394/large/dafazan-keyrender1ex.jpg?1708517799"
          del=""
          edit=""
        />
        <Pcards
          title="Porto 1"
          desc=" Ini deskripsi yang ga panjang"
          img="https://cdna.artstation.com/p/assets/images/images/072/923/394/large/dafazan-keyrender1ex.jpg?1708517799"
          del=""
          edit=""
        />
        <Pcards
          title="Porto 1"
          desc=" Ini deskripsi yang ga panjang"
          img="https://cdna.artstation.com/p/assets/images/images/072/923/394/large/dafazan-keyrender1ex.jpg?1708517799"
          del=""
          edit=""
        />
      </div>
    </div>
  );
}

export default Portofolio;
