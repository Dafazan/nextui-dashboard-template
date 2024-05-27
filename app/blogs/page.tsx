import { SearchIcon } from "@/components/icons/searchicon";
import Postcard from "@/components/posts/postcard";
import PostcardH from "@/components/posts/postcard2";
import { Input } from "@nextui-org/react";
import React from "react";

function Blogs() {
  return (
    <div className="p-5">
      <button className="w-full h-32 flex justify-center items-center bg-[#282828] border border-[#777777] text-[#777777] rounded-md mb-8 hover:text-white">
        NEW POST
      </button>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <p className="text-[#ffffff] font-bold text-xl">UPLOADED POSTS</p>
        <div className="flex gap-2 w-full md:w-3/6">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search Post"
          />
          <button className="p-2 bg-blue-500 rounded-xl h-full">SEARCH</button>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-5">
        <PostcardH del={""} img="" title="Titles" />
        <PostcardH del={""} img="" title="Titles" />
      </div>
    </div>
  );
}

export default Blogs;
