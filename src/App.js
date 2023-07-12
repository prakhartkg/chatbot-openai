// ChatApp.js

import React, { useState } from 'react';
import axios from 'axios';
import Mermaid from './mermaid';

import './index.css'; // Import the CSS file for styling

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const BACKEND_API='http://localhost:9000/api/search'
    // Send user message to the backend server
    const response = await axios.post(BACKEND_API, { message: inputMessage });

    const aiMessage = response.data.message;
    const chartResponse = response.data.chartResponse;

    setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    setMessages(prevMessages => [...prevMessages, { text: aiMessage, sender: 'ai',chart:chartResponse}]);

    if (chartResponse) {
      // Display the chart using Mermaid.js
      // Use chartResponse to render the chart in the UI
    }

    setInputMessage('');
  };

  return (
    <div className="chat-app">
      <div className="message-container">
        {messages.map((message, index) => {
          if(message.sender==='ai'){
            return (
              <div key={index} className={`message ${message.sender}`}>
                <span className="sender">{message.sender}: </span>
                <span>{message.text}</span>
                <Mermaid chart={message.chart} />
              </div>
            )
          }else{
            return (
              <div key={index} className={`message ${message.sender}`}>
                <span className="sender">{message.sender}: </span>
                <span>{message.text}</span>
              </div>
            )
          }
        })}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="message-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
