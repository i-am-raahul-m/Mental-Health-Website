import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Music from './components/Music';
import Chat from './components/Chat';
import GuidedMeditation from './components/GuidedMeditation';
import Sleep from './components/Sleep';
import Therapy from './components/Therapy';
import SelfCare from './components/SelfCare';
import MemoryMatch from './components/MemoryMatch';
import Breakout from "./components/Breakout";
import VoiceToText from './components/VoiceToText';
import Forum from './components/Forum';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/voice-to-text" element={<VoiceToText />} />
            <Route path="/guided-meditation" element={<GuidedMeditation />} />
            <Route path="/sleep" element={<Sleep />} />
            <Route path="/therapy" element={<Therapy />} />
            <Route path="/selfcare" element={<SelfCare />} />
            <Route path="/memory-match" element={<MemoryMatch />} />
            <Route path="/breakout" element={<Breakout />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
