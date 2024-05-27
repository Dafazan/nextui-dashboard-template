import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Postcard({
  title,
  img,
  del,
}: {
  title: string;
  img: string;
  del: any;
}) {
  return (
    <>
      <div className="bg-white rounded-md p-2 text-black flex flex-col">
        <div className="bg-blue-500 h-32 rounded-sm">IMAGE</div>
        <p className="text-lg font-semibold line-clamp-1">
          MY POST JUDULE PUANJANG
        </p>
        <p className="text-xs line-clamp-1 font-semibold">By: Author</p>
        <p className="text-xs line-clamp-1 font-semibold mb-2">01/01/01</p>
        <p className="text-xs line-clamp-2 mb-2">
          Lorem Ipsum Dolor Sit Amet banyak sampe dua baris line clamp nya
        </p>
        <div className="flex gap-2">
          <button className="bg-green-500 rounded-sm text-white w-full py-1">
            VIEW
          </button>
          <button className="bg-blue-500 rounded-sm text-white w-full py-1">
            EDIT
          </button>
          <button className="bg-red-500 rounded-sm text-white w-full py-1">
            DELETE
          </button>
        </div>
      </div>
    </>
  );
}

export default Postcard;
