import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaArrowAltCircleLeft, FaArrowRight, FaMicrophone } from 'react-icons/fa';

const GoodMorning7 = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordings, setRecordings] = useState([]); 
  // S3
  const [s3url, setS3url] = useState([]);
  // Speech-to-text
  const [transcription, setTranscription] = useState(["None"]);
  const [accuracyRate, setAccuracyRate] = useState([0]);
  // waiting for transcription results
  const [isLoading, setIsLoading] = useState(false);
  // Upload to S3 permission
  const [hasPermission, setPermission] = useState(true);

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
      const response = await axios.post('https://mitbackend.onrender.com/api/s3/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const currUrl = response.data.url;
      setS3url(currUrl);

      console.log("Succesfull upload at: ", currUrl);
      console.log(s3url);
    } catch (err) {
      console.log("Error uploading file ", err);
    }

  };

  // speech-to-text API
  const transcribeRecording = async () => {
    if (recordings.length === 0) return;
    
    const recording = recordings[recordings.length - 1];
    const formData = new FormData();
    formData.append('audioFile', recording, 'recording.webm');
    // http://localhost:5001/api/speech/transcribe
    // https://mitbackend.onrender.com/api/speech/transcribe
    try {
      const response = await axios.post('https://mitbackend.onrender.com/api/speech/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const transcription = response.data.text;
      setTranscription(transcription);
      console.log("Transcribed: ", transcription);
      calculateAccuracy(transcription);
    } catch (err) {
      console.log("Error transcribing file ", err);
    }
  };

  const calculateAccuracy = (current_transcription) => {
    const actualSentence = "Good morning.";
    const actualWords = actualSentence.toLowerCase().split(" ");
    const transcribedWords = current_transcription.toLowerCase().split(" ");
  
    // Count correct words
    let correctCount = 0;
    actualWords.forEach((word, index) => {
      if (transcribedWords[index] === word) {
        console.log(transcribedWords[index] + " " + word);
        correctCount += 1;
      }
    });
  
    // Calculate accuracy
    const accuracy = (correctCount / actualWords.length) * 100;
    setAccuracyRate(accuracy.toFixed(2)); // Return as a percentage with 2 decimal places
  };

  const handleBack = () => {
    navigate('/good-morning-6');
  };

  const handleNext = async () => {
    console.log(hasPermission);
    if (hasPermission) {
      await uploadRecording();
    }
    navigate('/good-morning-done');
  };

  const handleUpload = () => {
    setPermission(false);
  };

  // Call both S3 and transcription on button click
const handleSeeResults = async () => {
  setIsLoading(true);
  await transcribeRecording(); // Transcribe directly using AssemblyAI
  setIsLoading(false);
};

  return (
    <div>
        <button className="backButton" onClick={handleBack} title="Go back!"><FaArrowAltCircleLeft style={{ color: 'black' }}/></button>
        <h2>Great Job!</h2>
        <h2>Now practice saying the sentence by yourself!</h2>
        <p>When you feel ready, record yourself speaking the sentence!</p>
        <p>After you finish recording, press "play recording" to listen back!</p>
        {isRecording ? 
        (
            <button onClick={stopRecording}>Stop Recording</button>
        ) : 
        (
            <button onClick={startRecording} className="microPhone" title="click me to record!"><FaMicrophone style={{ color: 'black' }}/></button>
        )}
        <p></p>
        {hasRecording ? 
        (
          <button onClick={playRecording} disabled={recordings.length === 0} className="playAudio">
            <FaPlay style={{ color: 'black' }}/>
          </button>
        ) : 
        (
            <p>Make a recording to play it!</p>
        )}
        <p></p>
        {isLoading ? (
          <button disabled>Loading...</button>
        ) : (
          <button onClick={handleSeeResults}>See Results!</button>
        )}
        <p></p>
        {transcription && <p>Transcription: {transcription}</p>}
        {accuracyRate && <p>Accuracy Rate: {accuracyRate}%</p>}
        <p></p>
        <button className="optButton" onClick={handleUpload}>
          Click here to opt out of your anonymous voice recordings being used for research
        </button>
        <button
          className="nextButton"
          onClick={handleNext}
          title="Next step!"
          // disabled={accuracyRate < 100} // Enable only if accuracy is 100%
        >
          <FaArrowRight style={{ color: 'black' }} />
        </button>
    </div>
  );
};

export default GoodMorning7;
