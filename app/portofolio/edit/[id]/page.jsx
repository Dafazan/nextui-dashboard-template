'use client'
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/db/firebase";
import { format } from "date-fns";
import { TextField } from "@mui/material";
import Quilltext from "@/components/quill/quil";

function Edit({ params }) {
  const [fetchedDocumentData, setFetchedDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "portfolio", params.id); // Reference the specific document
        const docSnap = await getDoc(docRef);
        setFetchedDocumentData(docSnap.data());
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!fetchedDocumentData) {
    return <div>No data found</div>;
  }

  const timestamp = fetchedDocumentData.createdAt.toDate();
  const formattedDate = format(timestamp, "yyyy-MM-dd");

  return (
    <div className="p-5">
      <div className="bg-white rounded-md p-3 py-5 text-black">
        <div >
          <div className="flex gap-3 px-2">

          <div className="w-2/6 ">
            <img src={fetchedDocumentData.img} alt="" />
          </div>
          <div className="w-4/6 ">

          {/* <h3>{formattedDate}</h3> */}
           <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              sx={{ width: "100%" }}
              required
              //onChange={(e) => setTitle(e.target.value)}
              value={fetchedDocumentData.title}
            />
           <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              onChange={(e) => setDes(e.target.value)}
              required
              value={fetchedDocumentData.description}
            />
         
          </div>
          </div>
         <div className="my-3">

          {fetchedDocumentData.content.map((contentItem, index) => (
            <div key={index}>
              <div className="flex flex-wrap">
                {contentItem.img.map((imgItem, imgIndex) => (
                  imgItem.img && (
                    <div key={imgIndex} className="w-3/6 p-2">
                      <img alt="content" src={imgItem.img} className=" rounded-sm w-full object-cover"  />
                    </div>
                    
                  )
                ))}
               
              </div>
              <Quilltext
              value={contentItem.text}
              />
              <div className="ql-editor px-2"></div>
            </div>
          ))}
         </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
