import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_sing_piano.mp3';
import { FaArrowAltCircleLeft, FaArrowRight } from 'react-icons/fa';

const GoodMorning3 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/good-morning-2');
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
        <button className="backButton" onClick={handleBack} title="Go back!"><FaArrowAltCircleLeft style={{ color: 'black' }}/></button>
        <h2>Now sing along with the audio while tapping your left hand.</h2>
        <p>Practice a few times until you are comfortable.</p>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button className="nextButton" onClick={handleNext} title="Next step!"><FaArrowRight style={{ color: 'black' }}/></button>
    </div>
  );
};

export default GoodMorning3;
