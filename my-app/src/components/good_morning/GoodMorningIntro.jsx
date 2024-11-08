import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_piano.mp3';
import { FaArrowAltCircleLeft, FaArrowRight } from 'react-icons/fa';


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
        <button className="backButton" onClick={handleBack} title="Go back!"><FaArrowAltCircleLeft style={{ color: 'black' }}/></button>
        <h2>Notes will play for each syllable in the sentence.</h2>
        <h2>Try tapping your left fingers when each syllable turns red.</h2>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile} />
        <button className="nextButton" onClick={handleNext} title="Next step!"><FaArrowRight style={{ color: 'black' }}/></button>
    </div>
  );
};

export default GoodMorningIntro;
