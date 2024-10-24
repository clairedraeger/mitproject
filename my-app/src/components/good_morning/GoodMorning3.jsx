import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_sing_piano.mp3';

const GoodMorning3 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/good-morning-intro');
  };

  const handleNext = () => {
    navigate('/good-morning-4');
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
        <h2>Now sing along with the audio while tapping your left hand.</h2>
        <h2>Practice a few times until you are comfortable.</h2>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button onClick={handleNext}>Next Step</button>
    </div>
  );
};

export default GoodMorning3;