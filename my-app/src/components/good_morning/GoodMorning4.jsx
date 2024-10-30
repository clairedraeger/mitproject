import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_sing.mp3';
import { FaArrowAltCircleLeft, FaArrowRight } from 'react-icons/fa';


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
        <button class="backButton" onClick={handleBack} title="Go back!"><FaArrowAltCircleLeft style={{ color: 'black' }}/></button>
        <h2>Try singing and tapping along to the audio without the piano.</h2>
        <p>Practice a few times until you are comfortable.</p>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button class="nextButton" onClick={handleNext} title="Next step!"><FaArrowRight style={{ color: 'black' }}/></button>
    </div>
  );
};

export default GoodMorning4;
