import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PitchDetector from '../PitchDetector';
import { FaPlay, FaArrowAltCircleLeft, FaArrowRight, FaMicrophone } from 'react-icons/fa';

const GoodMorning5 = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordings, setRecordings] = useState([]); 
  const mediaRecorderRef = useRef(null);
  const micRef = useRef(null);

  // ask for permission and start recording
  const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio : true});
        micRef.current = stream; // take in audio stream

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();

        setIsRecording(true);
    } catch (err) {
        console.log('Error with microphone. Make sure to allow permission: ', err);
    }
  };

// get the data and set it to recorded chunks
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      const newRecording = new Blob([event.data], { type: 'audio/webm' });
      setRecordings(prevRecordings => [...prevRecordings, newRecording]);
    }
  };

  // play recording
  const playRecording = () => {
    if (recordings.length > 0) {
      const mostRecentRecording = recordings[recordings.length - 1];
      const audioUrl = URL.createObjectURL(mostRecentRecording);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }

  // stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    micRef.current.getTracks().forEach(track => track.stop());
    setIsRecording(false);
    setHasRecording(true);
  };

  const handleBack = () => {
    navigate('/good-morning-4');
  };

  const handleNext = () => {
    navigate('/good-morning-6');
  };

  // Good Morning sentence
  const syllables = [
    { syllable: 'Good ', time: 10 },
    { syllable: 'Mor', time: 1200 },
    { syllable: 'ning', time: 2200 }
  ];

  return (
    <div className="five">
        <button className="backButton" onClick={handleBack} title="Go back!" style={{ color: 'black' }}><FaArrowAltCircleLeft /></button>
        <h2>Great Job! Now practice singing by yourself!</h2>
        <p>When you feel ready, click the microphone to record yourself singing the sentence!</p>
        <p>After you finish recording, press the "play" icon to listen back!</p>
        {isRecording ? 
        (
            <button onClick={stopRecording}>Stop Recording</button>
        ) : 
        (
            <button onClick={startRecording} className="microPhone" title="click me to record!" style={{ color: 'black' }}><FaMicrophone /></button>
        )}
        <p></p>
        {hasRecording ? 
        (
            <button onClick={playRecording} disabled={recordings.length === 0} className="playAudio">
                <FaPlay />
            </button>
        ) : 
        (
            <p></p>
        )}
        <PitchDetector isRecording={isRecording} syllables={syllables}/>
        <button className="nextButton" onClick={handleNext} title="Next step!" style={{ color: 'black' }}><FaArrowRight /></button>
    </div>
  );
};

export default GoodMorning5;
