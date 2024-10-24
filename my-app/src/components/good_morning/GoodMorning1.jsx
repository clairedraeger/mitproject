import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_piano.mp3';

const GoodMorning1 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/good-morning-intro');
  };

  const handleNext = () => {
    navigate('/good-morning-2');
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
        <h2>Now try to hum the sentence while tapping by yourself!</h2>
        <h2> If you forget the notes, just click "play notes" button.</h2>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button onClick={handleNext}>Next Step</button>
    </div>
  );
};

export default GoodMorning1;
