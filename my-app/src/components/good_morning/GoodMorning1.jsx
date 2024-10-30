import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_piano.mp3';
import { FaArrowAltCircleLeft, FaArrowRight } from 'react-icons/fa';


const GoodMorning1 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/good-morning-0');
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
        <button class="backButton" onClick={handleBack} title="Go back!"><FaArrowAltCircleLeft style={{ color: 'black' }}/></button>
        <h2>Now try to hum the sentence while tapping by yourself!</h2>
        <p> If you forget the notes, just click "play" icon.</p>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button class="nextButton" onClick={handleNext} title="Next step!"><FaArrowRight style={{ color: 'black' }}/></button>
    </div>
  );
};

export default GoodMorning1;
