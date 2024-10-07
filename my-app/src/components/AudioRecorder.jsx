import React, { useState, useRef } from 'react';
import PitchDetector from './PitchDetector';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaRecorderRef = useRef(null);
  const micRef = useRef(null);

  // Ask for permission and start recording
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
      setRecordedChunks(prev => [...prev, event.data]);
    }
  };

  // play recording
  const playRecording = () => {
    const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  }

  // stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    micRef.current.getTracks().forEach(track => track.stop());
    setIsRecording(false);
    setHasRecording(true);
  };

  return (
    <div>
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
        <button onClick={playRecording} disabled={recordedChunks.length === 0}>
            Play Recording
        </button>
      ) : 
      (
        <p>Make a recording to play it!</p>
      )}
      <PitchDetector isRecording={isRecording} /> {/* Pass isRecording to PitchDetector */}
    </div>
  );
};

export default AudioRecorder;
