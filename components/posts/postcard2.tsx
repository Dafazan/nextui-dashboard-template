import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function PostcardH({
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
      <div className="bg-[#282828] border border-[#777777]  rounded-md p-2 text-white flex justify-between gap-6">
        <div>
          <p className="text-lg font-semibold line-clamp-1">
            MY POST JUDULE PUANJANG
          </p>
          <p className="text-xs line-clamp-1 font-semibold">By: Author</p>
          <p className="text-xs line-clamp-1 font-semibold mb-2">01/01/01</p>
          <p className="text-xs line-clamp-2 mb-2">
            Lorem Ipsum Dolor Sit Amet banyak sampe dua baris line clamp nya
            Lorem Ipsum Dolor Sit Amet banyak sampe dua baris line clamp nya
            Lorem Ipsum Dolor Sit Amet banyak sampe dua baris line clamp nya{" "}
            Lorem Ipsum Dolor Sit Amet banyak sampe dua baris line clamp nya{" "}
            Lorem Ipsum Dolor Sit Amet banyak sampe dua baris line clamp nya{" "}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-green-500 rounded-sm text-white w-full py-1 px-5">
            VIEW
          </button>
          <button className="bg-blue-500 rounded-sm text-white w-full py-1 px-5">
            EDIT
          </button>
          <button className="bg-red-500 rounded-sm text-white w-full py-1 px-5">
            DELETE
          </button>
        </div>
      </div>
    </>
  );
}

export default PostcardH;
