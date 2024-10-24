import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_piano.mp3';

const GoodMorning0 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/good-morning-1');
  };

  // Good Morning sentence
  const syllables = [
    { syllable: 'Good ', time: 10 },
    { syllable: 'Mor', time: 1200 },
    { syllable: 'ning', time: 2200 }
  ];

  return (
    <div>
        <button onClick={handleBack}>back</button>
        <h2>While continuing to tap your left hang, hum along with the notes</h2>
        <h2>Practice a couple of times until you feel comfortable.</h2>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button onClick={handleNext}>Next Step</button>
    </div>
  );
};

export default GoodMorning0;
