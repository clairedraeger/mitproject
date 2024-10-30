import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_speak.mp3';
import { FaArrowAltCircleLeft, FaArrowRight } from 'react-icons/fa';

const GoodMorning6 = () => {
  const navigate = useNavigate();


  const handleBack = () => {
    navigate('/good-morning-5');
  };

  const handleNext = () => {
    navigate('/good-morning-7');
  };

  // Good Morning sentence
  const syllables = [
    { syllable: 'Good ', time: 10 },
    { syllable: 'Mor', time: 1200 },
    { syllable: 'ning', time: 2200 }
  ];

  return (
    <div>
        <button class="backButton" onClick={handleBack} title="Go back!" style={{ color: 'black' }}><FaArrowAltCircleLeft /></button>
        <h2>Great Job!</h2>
        <h2>Let's try speaking the sentence slowly.</h2>
        <p>If you don't feel ready, feel free to go back.</p>
        <p>Practice until you feel comfortable!</p>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button class="nextButton" onClick={handleNext} title="Next step!" style={{ color: 'black' }}><FaArrowRight /></button>
    </div>
  );
};

export default GoodMorning6;
