import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './components/IntroPage';
import AudioRecorder from './components/AudioRecorder';

// good morning
import GoodMorning from './components/good_morning/GoodMorning';
import GoodMorningIntro from './components/good_morning/GoodMorningIntro';
import GoodMorning0 from './components/good_morning/GoodMorning0';
import GoodMorning1 from './components/good_morning/GoodMorning1';
import GoodMorning2 from './components/good_morning/GoodMorning2';
import GoodMorning3 from './components/good_morning/GoodMorning3';
import GoodMorning4 from './components/good_morning/GoodMorning4';
import GoodMorning5 from './components/good_morning/GoodMorning5';
import GoodMorning6 from './components/good_morning/GoodMorning6';
import GoodMorning7 from './components/good_morning/GoodMorning7';
import GoodMorningDone from './components/good_morning/GoodMorningDone';


import './App.css';

const App = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/audio-recorder" element={<AudioRecorder />} />
        <Route path="/good-morning-intro" element={<GoodMorningIntro />} />
        <Route path="/good-morning-0" element={<GoodMorning0 />} />
        <Route path="/good-morning-1" element={<GoodMorning1 />} />
        <Route path="/good-morning-2" element={<GoodMorning2 />} />
        <Route path="/good-morning-3" element={<GoodMorning3 />} />
        <Route path="/good-morning-4" element={<GoodMorning4 />} />
        <Route path="/good-morning-5" element={<GoodMorning5 />} />
        <Route path="/good-morning-6" element={<GoodMorning6 />} />
        <Route path="/good-morning-7" element={<GoodMorning7 />} />
        <Route path="/good-morning-done" element={<GoodMorningDone />} />
        <Route path="/good-morning" element={<GoodMorning />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
