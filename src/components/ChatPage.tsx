// ChatPage.tsx
import React, { useState } from 'react';
import { FaPaperclip, FaTelegramPlane, FaTimes } from 'react-icons/fa';

const ChatPage: React.FC = () => {
  // Placeholder data for multiple users and messages
  const users = [
    { id: 1, name: 'John Doe', avatar: 'https://placekitten.com/50/50' },
    { id: 2, name: 'Jane Smith', avatar: 'https://placekitten.com/50/51' },
    // Add more users as needed
  ];

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { userId: 1, name: "John Doe" , text: 'Hello!', time: '10:00 AM' },
    { userId: 2, name: "Jane" , text: 'Hi there!', time: '10:02 AM' },
    { userId: 1, name: "Victor" , text: 'How are you?', time: '10:05 AM' },
    { userId: 2, name: "fin" , text: 'I am good, thanks!', time: '10:10 AM' },
    // Add more messages as needed
  ]);

  const getUserById = (userId: number) => users.find((user) => user.id === userId);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        userId: 1, // Assuming the current user (you) is always sending messages
        name: "Your Name",
        text: messageInput,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput('');
    }
    
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Handle file attachment logic here
      console.log('Attached file:', file);
    }
  };

  

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Conference Call</h2>
        <FaTimes/>
      </div>
      <div className="chat-content">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            <img
              src={getUserById(message.userId)?.avatar || ''}
              alt={getUserById(message.userId)?.name || ''}
              className="user-avatar"
            />
            <div className="message-content">
            <p className="message-name">{message.name}</p>
              <p className="message-text">{message.text}</p>
              <span className="message-time">{message.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
      <label htmlFor="fileInput">
          <FaPaperclip />
        </label>
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        
        <button onClick={handleSendMessage}>
          <FaTelegramPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
