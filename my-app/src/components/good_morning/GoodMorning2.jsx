import React from 'react';
import { useNavigate } from 'react-router-dom';
import SyllableEmphasizer from '../SyllableEmphasizer';
import audioFile from '../../audios/good_morning_sing_piano.mp3';
import { FaArrowAltCircleLeft, FaArrowRight } from 'react-icons/fa';

const GoodMorning2 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/good-morning-1');
  };

  const handleNext = () => {
    navigate('/good-morning-3');
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
        <h2>Great Job! Now, let's work on singing the sentence with the same tone as the notes.</h2>
        <p>Play the audio to hear what it should sound like!.</p>
        <SyllableEmphasizer syllables={syllables} audioSrc={audioFile}/>
        <button class="nextButton" onClick={handleNext} title="Next step!"><FaArrowRight style={{ color: 'black' }}/></button>
    </div>
  );
};

export default GoodMorning2;
