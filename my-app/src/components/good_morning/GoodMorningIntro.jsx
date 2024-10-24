import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_piano.mp3';

const GoodMorningIntro = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/good-morning-0');
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
        <h2>Notes will play for each syllable in the sentence.</h2>
        <h2>Try tapping your left fingers when each syllable turns red.</h2>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile} />
        <button onClick={handleNext}>Next Step</button>
    </div>
  );
};

export default GoodMorningIntro;
