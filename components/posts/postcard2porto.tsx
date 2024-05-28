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
  edit,
}: {
  title: string;
  img: string;
  del: any;
  desc: any;
  link: string;
  edit: string;
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
            className="px-2 rounded-sm w-full h-full text-center flex flex-col justify-center items-center text-sm font-semibold"
          >
            <svg
              fill="#ffffff"
              width="30px"
              height="30px"
              viewBox="-3.5 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>view</title>
              <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path>
            </svg>
          </a>
          <a
            href={edit}
            className=" px-2 rounded-sm w-full h-full text-center flex flex-col justify-center items-center text-sm font-semibold"
          >
            <svg
              fill="#246cf2"
              width="28px"
              height="28px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>edit</title>
              <path d="M10.681 18.207l-2.209 5.67 5.572-2.307-3.363-3.363zM26.855 6.097l-0.707-0.707c-0.78-0.781-2.047-0.781-2.828 0l-1.414 1.414 3.535 3.536 1.414-1.414c0.782-0.781 0.782-2.048 0-2.829zM10.793 17.918l0.506-0.506 3.535 3.535 9.9-9.9-3.535-3.535 0.707-0.708-11.113 11.114zM23.004 26.004l-17.026 0.006 0.003-17.026 11.921-0.004 1.868-1.98h-14.805c-0.552 0-1 0.447-1 1v19c0 0.553 0.448 1 1 1h19c0.553 0 1-0.447 1-1v-14.058l-2.015 1.977 0.054 11.085z"></path>
            </svg>
          </a>
          <button
            onClick={del}
            className=" px-2 rounded-sm w-full h-full text-center flex flex-col justify-center items-center text-sm font-semibold"
          >
            <svg
              fill="#f22f24"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default PostcardHPorto;
