import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello, I am here to support you. How can I help today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5002/chat", {
        message: input
      });

      const botMessage = {
        sender: "bot",
        text: response.data.response
      };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error(
        "Error fetching chatbot response:",
        error.response ? error.response.data : error.message
      );
      setMessages([
        ...updatedMessages,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble responding right now."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat">
      <h2>Mental Health Support Chat</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <strong>{msg.sender === "bot" ? "Solace" : "You"}:</strong>{" "}
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && (
          <div className="loading">
            <span>Loading...</span>
          </div>
        )}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
      <div className="disclaimer">
        <p>
          <strong>Disclaimer:</strong> This chat is not a substitute for professional help.
        </p>
      </div>
    </div>
  );
}

export default Chat;
