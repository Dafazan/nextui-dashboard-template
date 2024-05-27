import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function PostcardHPorto({
  title,
  img,
  del,
  desc,
  link,
}: {
  title: string;
  img: string;
  del: any;
  desc: any;
  link: string;
}) {
  return (
    <>
      <div className="bg-[#282828] h-32 border border-[#777777]  rounded-md p-2 text-white flex justify-between gap-3">
        <div className="bg-blue-500 h-full w-32">
          <img className="w-full h-full object-cover" src={img} alt="" />
        </div>
        <div className=" w-full">
          <p className="text-lg font-semibold line-clamp-1">{title}</p>
          <p className="text-xs line-clamp-1 font-semibold">
            Uploaded By: User
          </p>
          <p className="text-xs line-clamp-2 mb-2">{desc}</p>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={link}
            className="bg-green-500 rounded-sm text-white w-full py-1 px-5"
          >
            VIEW
          </a>
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

export default PostcardHPorto;
