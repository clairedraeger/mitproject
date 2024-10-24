import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoodMorning7 = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordings, setRecordings] = useState([]); 
  // S3
  const [s3url, setS3url] = useState([]);
  // Speech-to-text
  const [transcription, setTranscription] = useState([]);
  const mediaRecorderRef = useRef(null);
  const micRef = useRef(null);

  // ask for permission and start recording
  const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio : true});
        micRef.current = stream; // take in audio stream

        mediaRecorderRef.current = new MediaRecorder(stream);
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
  const stopRecording = async() => {
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.stop();
    micRef.current.getTracks().forEach(track => track.stop());
    setIsRecording(false);
    setHasRecording(true);
  };

  // upload recording to S3
  const uploadRecording = async() => {
    console.log(recordings.length);
    if (recordings.length === 0) return;
    const recording = recordings[recordings.length - 1];
    const formData = new FormData();
    formData.append('audioFile', recording, 'recording.webm');

    // try to upload recording
    try {
      const response = await axios.post('http://localhost:5001/api/s3/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const currUrl = response.data.url;
      setS3url(response.data.url);
      getTranscription(currUrl);

      console.log("Succesfull upload at: ", response.data.url);
    } catch (err) {
      console.log("Error uploading file ", err);
    }

  };

  // speech-to-text API
  const getTranscription = async(s3Url) => {
    try {
      const response = await axios.post('http://localhost:5001/api/speech/transcribe', { audioUrl: s3Url });
      const transcription = response.data.transcription;
      setTranscription(transcription);
      console.log("Transcribed: ", transcription);
    } catch (err) {
      console.log("Error with speech-to-text: ", err);
    }
  };

  const handleBack = () => {
    navigate('/good-morning-6');
  };

  const handleNext = () => {
    navigate('/good-morning-6');
  };
  return (
    <div>
        <button onClick={handleBack}>back</button>
        <h2>Great Job!</h2>
        <h2>Now practice saying the sentence by yourself!</h2>
        <p>When you feel ready, record yourself singing the sentence!</p>
        <p>After you finish recording, press "play recording" to listen back!</p>
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
                Play Recording
            </button>
        ) : 
        (
            <p>Make a recording to play it!</p>
        )}
        <button onClick={uploadRecording}>See Results!</button>
        <button onClick={handleNext}>Next Step</button>
    </div>
  );
};

export default GoodMorning7;
