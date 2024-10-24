import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_sing.mp3';

const GoodMorning4 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/good-morning-intro');
  };

  const handleNext = () => {
    navigate('/good-morning-5');
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
        <h2>Try singing and tapping along to the audio without the piano.</h2>
        <h2>Practice a few times until you are comfortable.</h2>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button onClick={handleNext}>Next Step</button>
    </div>
  );
};

export default GoodMorning4;
