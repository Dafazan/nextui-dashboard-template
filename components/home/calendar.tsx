"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { firestore } from "firebase-admin";
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
import moment from "moment";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";

interface EventData {
  id?: string;
  title: string;
  start: string;
  end?: string;
  remark?: string;
  color?: string;
}

const FullCalendarComponent = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("blue");

  const handleColorChange = (event: any) => {
    setSelectedColor(event.target.value);
  };

  useEffect(() => {
    fetchDate();
  }, []);

  const fetchDate = async () => {
    try {
      const ordersRef = collection(db, "events");
      const q = query(ordersRef, orderBy("start"));
      const querySnapshot = await getDocs(q);
      let data: any[] = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data.push({ ...doc.data(), id: doc.id });
      });
      setEvents(data);
    } catch (error) {
      alert(error);
    }
  };

  //   const eventse = [
  //     { title: "Event 1", start: "2024-07-27", color: "blue" },
  //     { title: "Event 1", start: "2024-07-27", color: "green" },
  //     { title: "Event 1", start: "2024-07-27", color: "violet" },
  //     { title: "Event 2", start: "2024-07-29", end: "2024-07-30", color: "red" },
  //   ];

  const addData = async (e: any) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "events"), {
      title: title,
      start: start,
      end: end,
      color: selectedColor,
    });

    //alert("success");
    fetchDate();
  };

  const getColorLabel = (color: any) => {
    switch (color) {
      case "red":
        return "Deadline";
      case "blue":
        return "General";
      case "violet":
        return "Mandatory";
      case "green":
        return "Mark";
      default:
        return "Unknown"; // Optional: handle unexpected values
    }
  };

  const getColorStyle = (color: any) => {
    switch (color) {
      case "red":
        return "bg-red-400";
      case "blue":
        return "bg-blue-400";
      case "violet":
        return "bg-violet-400";
      case "green":
        return "bg-green-400";
      default:
        return "bg-none"; // Optional: handle unexpected values
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      console.error("Document ID is undefined");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        // Delete the document with the given ID from the "events" collection in Firestore.
        await deleteDoc(doc(db, "events", id));
        console.log("Document deleted successfully");
        // Refresh data after deletion
        fetchDate();
      } catch (error) {
        console.error("An error occurred", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        // eventClick={(info) => {
        //   alert(`Event: ${info.event.title}`);
        // }}
        // dateClick={(info) => {
        //   alert(`Clicked on: ${info.dateStr}`);
        // }}
      />
      <div className="bg-white rounded-md p-3 flex flex-col gap-2">
        <p className="text-[#000000] font-bold text-xl">ADD NEW EVENT</p>
        <div className="flex gap-3 ">
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex gap-2 px-3 rounded-sm items-center">
            <p className="text-black">FROM</p>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full bg-gray-300 text-black"
            />
          </div>
          <div className="flex gap-2 px-3 rounded-sm items-center">
            <p className="text-black">TO</p>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full bg-gray-300 text-black"
            />
          </div>
          <div>
            <select
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full bg-gray-300 text-black"
              onChange={handleColorChange}
              value={selectedColor}
            >
              <option value="blue">Mark</option>
              <option value="green">General</option>
              <option value="red">Deadline</option>
              <option value="violet">Mandatory</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <button
            onClick={addData}
            className="bg-blue-500 rounded-md flex justify-center items-center text-center font-semibold px-5"
          >
            ADD
          </button>
        </div>
      </div>
      <div className="bg-white p-3 rounded-md text-black flex flex-col gap-2">
        <div className="flex w-full justify-between gap-2">
          <p className="w-[40%]">Event</p>
          <p className="w-[30%]">Date</p>
          <p className="w-[20%]">Remark</p>
          <p className="w-[10%]">Action</p>
        </div>
        <div className="w-full border border-b-black"></div>
        {events.map((data, i) => {
          const formattedStart = moment(data.start).format(
            "dddd, MMMM D, YYYY"
          );
          const formattedEnd = data.end
            ? moment(data.end).format("dddd, MMMM D, YYYY")
            : "Ongoing";

          return (
            <div className="flex w-full justify-between gap-2" key={i}>
              <p className="w-[40%] line-clamp-1 truncate">{data.title}</p>
              <p className="w-[30%] line-clamp-1">{formattedStart}</p>
              <p
                className={`w-[20%] line-clamp-1 rounded-md p-1 text-white ${getColorStyle(
                  data.color
                )}`}
              >
                {getColorLabel(data.color)}
              </p>
              <div className="w-[10%] grid grid-cols-2">
                <button
                  onClick={() => handleDelete(data.id)}
                  className="font-semibold text-red-500"
                >
                  DEL
                </button>
                <button className="font-semibold text-blue-500">EDT</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FullCalendarComponent;
