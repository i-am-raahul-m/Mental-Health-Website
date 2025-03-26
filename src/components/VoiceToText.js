import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VoiceChat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello, I am here to support you. How can I help today?' }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'en-US';
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;

    recognitionInstance.onresult = async (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      const userMessage = { sender: 'user', text: transcript };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      try {
        const response = await axios.post('http://127.0.0.1:5002/chat', { message: transcript });
        const botMessage = {
          sender: 'bot',
          text: response.data.response || 'Unexpected response format.'
        };
        setMessages([...updatedMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
        setMessages([...updatedMessages, { sender: 'bot', text: 'Sorry, I\'m having trouble responding right now.' }]);
      }
    };

    recognitionInstance.onerror = event => console.error('Speech Recognition Error:', event.error);
    recognitionInstance.onend = () => setIsListening(false);
    setRecognition(recognitionInstance);
  }, [messages]);

  const handleStartListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="chat">
      <h2>Mental Health Voice Support Chat</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <strong>{msg.sender === 'bot' ? 'Solace' : 'You'}:</strong>{' '}
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handleStartListening} disabled={isListening}>Start Listening</button>
        <button onClick={handleStopListening} disabled={!isListening}>Stop Listening</button>
      </div>
      <div className="disclaimer">
        <p><strong>Disclaimer:</strong> This chat is not a substitute for professional help.</p>
      </div>
    </div>
  );
}

export default VoiceChat;
