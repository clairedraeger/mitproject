import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PitchDetector from './PitchDetector';
import { FaPlay } from 'react-icons/fa';

const AudioRecorder = () => {
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
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleBack}>back</button>
      <h2>Audio Recorder</h2>
      {isRecording ? 
      (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : 
      (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {hasRecording ? 
      (
        <button onClick={playRecording} disabled={recordings.length === 0}>
            <FaPlay style={{ color: 'black' }}/>
        </button>
      ) : 
      (
        <p>Make a recording to play it!</p>
      )}
      <PitchDetector isRecording={isRecording} />
    </div>
  );
};

export default AudioRecorder;
