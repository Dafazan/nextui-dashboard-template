// components/NotificationButton.tsx
"use client";
import React, { useEffect } from "react";
import { showNotification } from "@/utils/notifications";

const NotificationButton: React.FC = () => {
  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  };

  return (
    <button onClick={requestNotificationPermission}>
      Enable Notifications
    </button>
  );
};

const Home: React.FC = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const { title, body } = JSON.parse(event.data);
      showNotification(title, { body });
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleNewMessage = () => {
    // Simulate receiving a new message
    showNotification("New Message", {
      body: "You have received a new message.",
      icon: "/path/to/icon.png",
    });
  };

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <NotificationButton />
      <button onClick={handleNewMessage}>Simulate New Message</button>
    </div>
  );
};

export default Home;
