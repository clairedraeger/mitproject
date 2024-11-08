import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_piano.mp3';
import { FaPlay, FaArrowAltCircleLeft, FaArrowRight } from 'react-icons/fa';


const GoodMorning0 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/good-morning-intro');
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
        <button className="backButton" onClick={handleBack} title="Go back!"><FaArrowAltCircleLeft style={{ color: 'black' }}/></button>
        <h2>While continuing to tap your left hang, hum along with the notes</h2>
        <p>Practice a couple of times until you feel comfortable.</p>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button className="nextButton" onClick={handleNext} title="Next step!"><FaArrowRight style={{ color: 'black' }}/></button>
    </div>
  );
};

export default GoodMorning0;
