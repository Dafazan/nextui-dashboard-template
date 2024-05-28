"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/db/firebase";
import { format } from "date-fns";
import { TextField } from "@mui/material";
import Quilltext from "@/components/quill/quil";
import { redirect, useRouter } from "next/navigation";

interface Image {
  img: string;
  preview: string; // add preview to the Image interface
}

interface Content {
  img: Image[];
  text: string;
}

const New: React.FC = () => {
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const openAlert = () => setIsAlert(true);
  const closeAlert = () => setIsAlert(false);

  const [title, setTitle] = useState<string>("");
  const [des, setDes] = useState<string>("");

  const [data, setData] = useState<Content[]>([
    {
      img: [{ img: "", preview: "" }],
      text: "",
    },
  ]);

  const [downloadURL, setDownloadURL] = useState<string>("");
  const [topImagePreview, setTopImagePreview] = useState<string>(""); // state for top image preview

  // progressaaaaa
  const [percent, setPercent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (files: File) => {
    try {
      // Create a preview URL for the selected file
      const previewURL = URL.createObjectURL(files);
      setTopImagePreview(previewURL);

      setLoading(true);
      const storageRef = ref(storage, `/Portfolio/${files.name}`);

      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setDownloadURL(url);
            setLoading(false);
          });
        }
      );
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const handleUpload2 = async (
    files: File,
    e: ChangeEvent<HTMLInputElement>,
    i: number,
    ii: number
  ) => {
    const { name } = e.target;
    const onchangeVal = [...data];

    try {
      // Create a preview URL for the selected file
      const previewURL = URL.createObjectURL(files);
      onchangeVal[i].img[ii].preview = previewURL;

      setLoading(true);
      const storageRef = ref(storage, `/Portfolio/${files.name}`);

      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            if (name === "img") {
              onchangeVal[i].img[ii].img = url;
            }
            setData(onchangeVal);
            setLoading(false);
          });
        }
      );
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  const { push } = useRouter();
  const router = useRouter();
  const addData = async (e: FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const date = today.getDate() + " " + format(today, "MMMM yyyy");
    const docRef = await addDoc(collection(db, "portfolio"), {
      title: title,
      description: des,
      createdAt: today,
      img: downloadURL,
      date: date,
      content: data,
    });

    alert("success");
    push("/portofolio");
  };

  const handleClickImg = (i: number) => {
    const onchangeVal = [...data];
    onchangeVal[i].img.push({ img: "", preview: "" });
    setData(onchangeVal);
  };

  const handleDeleteImg = (i: number, ii: number) => {
    const updatedData = [...data];
    updatedData[i].img.splice(ii, 1);
    setData(updatedData);
  };

  const handleClick = () => {
    setData([
      ...data,
      {
        img: [{ img: "", preview: "" }],
        text: "",
      },
    ]);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    if (name in onchangeVal[i]) {
      onchangeVal[i][name as keyof Content] = value as never; // cast to never to satisfy typescript
    }
    setData(onchangeVal);
  };

  const handleDelete = (i: number) => {
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    // If the user confirmed, proceed with deletion
    if (userConfirmed) {
      const updatedData = [...data];
      updatedData.splice(i, 1);
      setData(updatedData);
    }
  };

  const handleQuillChange = (content: string, i: number) => {
    const updatedData = [...data];
    updatedData[i].text = content;
    setData(updatedData);
  };

  return (
    <div className="w-full p-5">
      <form onSubmit={addData}>
        <div className="flex flex-col justify-start gap-3 rounded-md bg-[#282828] border border-[#777777] text-[#777777] p-5">
          <div className="flex gap-3">
            {/* Display top image preview */}
            {topImagePreview && (
              <div>
                <img
                  src={topImagePreview}
                  alt="Top Image Preview"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
            )}
            <div className="flex flex-col">
              <p className="text-[#ffffff] font-bold text-xl">COVER IMAGE</p>

              <input
                type="file"
                required
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    handleUpload(event.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-sm p-5 gap-3">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              sx={{ width: "100%" }}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              onChange={(e) => setDes(e.target.value)}
              required
            />
          </div>
          <div className=" flex flex-col gap-3">
            {data.map((val, i) => (
              <div
                key={i}
                className="flex flex-col bg-white rounded-sm p-5 gap-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  {val.img.map((imgVal, ii) => (
                    <div key={ii}>
                      <div className="bg-[#282828] h-full flex flex-col border border-[#777777] rounded-md p-3 gap-3">
                        <input
                          type="file"
                          name="img"
                          onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                              handleUpload2(
                                event.target.files[0],
                                event,
                                i,
                                ii
                              );
                            }
                          }}
                        />
                        {imgVal.preview && (
                          <div>
                            <img
                              src={imgVal.preview}
                              alt={`Preview ${ii + 1}`}
                              style={{ maxWidth: "200px", maxHeight: "200px" }}
                            />
                          </div>
                        )}
                        {ii === val.img.length - 1 && (
                          <button
                            className="bg-red-500 rounded-md p-2 text-white"
                            onClick={() => handleDeleteImg(i, ii)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="bg-blue-500 rounded-md p-3 text-white"
                  type="button"
                  onClick={() => handleClickImg(i)}
                >
                  Add Image
                </button>
                <Quilltext
                  value={val.text}
                  onChange={(content) => handleQuillChange(content, i)}
                />
                <div className="w-full flex justify-end">
                  <button
                    className="bg-red-500 text-white p-2 rounded-md"
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-blue-500 rounded-md p-3 w-full text-white"
            type="button"
            onClick={handleClick}
          >
            Add More
          </button>
        </div>
        <div className="flex flex-col justify-start gap-3 rounded-md bg-[#282828] border border-[#777777] text-[#777777] p-5">
          <button
            className="bg-blue-500 rounded-md p-3 w-full text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default New;
