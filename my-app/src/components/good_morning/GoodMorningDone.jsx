import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';


const GoodMorningIntro = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/good-morning-7');
  };


  return (
    <div>
        <button class="backButton" onClick={handleBack} title="Go back!"><FaArrowAltCircleLeft style={{ color: 'black' }}/></button>
        <h2>Good job!</h2>
        <h2>You have finished this treatment.</h2>
    </div>
  );
};

export default GoodMorningIntro;
