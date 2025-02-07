import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "system",
      text: "You are a mental health support assistant. Respond empathetically and supportively. Be very respectful, considerate and use calming language. Respond to the point, do not give long einded messages."
    },
    {
      sender: "bot",
      text: "Hello, I am here to support you. How can I help today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "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"; // Replace with your actual Groq API key
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const MODEL_NAME = "llama-3.3-70b-versatile";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          model: MODEL_NAME,
          messages: updatedMessages.map((msg) => ({
            role:
              msg.sender === "user"
                ? "user"
                : msg.sender === "bot"
                ? "assistant"
                : "system",
            content: msg.text
          }))
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.choices[0].message.content
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
        {messages
          .filter((msg) => msg.sender !== "system")
          .map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <strong>{msg.sender === "bot" ? "Support" : "You"}:</strong>{" "}
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
