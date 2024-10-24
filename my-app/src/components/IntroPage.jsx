import React from 'react';
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleStartClick = () => {
    navigate('/good-morning-intro'); // Navigate to the audio recording page
  };

  return (
    <div>
      <h1>Welcome to Melodic Intonation Therapy (MIT) Online!</h1>
      <p>Click the button below to start your treatment.</p>
      <button onClick={handleStartClick}>Start Treatment</button>
    </div>
  );
};

export default IntroPage;
