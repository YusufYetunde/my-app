import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoCall from './components/VideoCall';
import ThankYou from './components/ThankYou';
import ChatPage from './components/ChatPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoCall />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/chat" element={<ChatPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
