// src/Dashboard.js
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Chatbot from "./Chatbot";
import './Chatbot.css';

function Dashboard({ user }) {
  const [chatCount, setChatCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="page-container">
      <header className="header">
        <div>Welcome, {user.email}</div>
        <div>Chats this session: {chatCount}</div>
        <div>{currentTime}</div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <Chatbot updateChatCount={() => setChatCount(c => c + 1)} />
    </div>
  );
}

export default Dashboard;
