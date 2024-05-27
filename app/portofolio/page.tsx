"use client";
import { SearchIcon } from "@/components/icons/searchicon";
import Postcard from "@/components/posts/postcard";
import PostcardH from "@/components/posts/postcard2";
import PostcardHPorto from "@/components/posts/postcard2porto";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  Firestore,
  orderBy,
  limit,
} from "firebase/firestore";
import { db, storage } from "@/app/db/firebase";
interface Portfolios {
  id: string;
  img: string;
  title: string;
  description: string;
  // Add more properties as needed
}
function Blogs() {
  const [portfolios, setPortfolios] = useState<Portfolios[]>([]);
  useEffect(() => {
    getPortfolios();
  }, []);
  async function getPortfolios() {
    try {
      const ordersRef = collection(db, "portfolio");
      const q = query(ordersRef);
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No documents found with status 'public'");
        return;
      }

      let data: Portfolios[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...(doc.data() as Portfolios), id: doc.id });
      });
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="p-5">
      <a
        href="/portofolio/new"
        className="w-full h-32 flex justify-center items-center bg-[#282828] border border-[#777777] text-[#777777] rounded-md mb-8 hover:text-white"
      >
        NEW PORTFOLIO
      </a>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <p className="text-[#ffffff] font-bold text-xl">UPLOADED PORTFOLIO</p>
        <div className="flex gap-2 w-full md:w-3/6">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search Portfolio"
          />
          <button className="p-2 bg-blue-500 rounded-xl h-full">SEARCH</button>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-5">
        {portfolios.map((data, i) => (
          <>
            <div className="">
              <PostcardHPorto
                del={""}
                img={data.img}
                title={data.title}
                desc={data.description}
                link={`/portofolio/${data.id}`}
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
