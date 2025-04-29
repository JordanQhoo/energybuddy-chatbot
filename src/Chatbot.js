// src/Chatbot.js
import React, { useState } from "react";
import './Chatbot.css';

const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

function Chatbot({ updateChatCount }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m EnergyBuddy. Ask me anything about your energy usage." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    updateChatCount();

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,  // Use correct API_KEY
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',  // ✅ Correct model name
          messages: [{ role: 'user', content: input }],  // ✅ Correct body
          max_tokens: 100,
        }),
      });

      const data = await response.json();

      if (data && data.choices && data.choices.length > 0) {
        const botMessage = { sender: "bot", text: data.choices[0].message.content };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage = { sender: "bot", text: "Sorry, no response from bot." };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      const botMessage = { sender: "bot", text: "Something went wrong. Please try again later." };
      setMessages(prev => [...prev, botMessage]);
      console.error(error);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Ask about electricity, solar, LEDs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
