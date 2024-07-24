"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { firestore } from "firebase-admin";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/app/db/firebase";

interface EventData {
  id?: string;
  title: string;
  start: string;
  end?: string;
}

const FullCalendarComponent = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

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

  const eventse = [
    { title: "Event 1", start: "2024-07-27", color: "blue" },
    { title: "Event 1", start: "2024-07-27", color: "green" },
    { title: "Event 1", start: "2024-07-27", color: "violet" },
    { title: "Event 2", start: "2024-07-29", end: "2024-07-30", color: "red" },
  ];

  const addData = async (e: any) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "events"), {
      title: title,
      start: start,
      end: end,
    });

    alert("success");
  };

  return (
    <div className="">
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
        eventClick={(info) => {
          alert(`Event: ${info.event.title}`);
        }}
        dateClick={(info) => {
          alert(`Clicked on: ${info.dateStr}`);
        }}
      />
      <form>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button onClick={addData}>Add Event</button>
      </form>
    </div>
  );
};

export default FullCalendarComponent;
