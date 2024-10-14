// using Web Audio API https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API 
// adapted from this tutorial: https://alexanderell.is/posts/tuner/ 

import React, {useEffect, useState, useRef} from 'react';

const PitchDetector = ({ isRecording }) => {
    const [pitch, setPitch] = useState(null);

    const audioContextRef = useRef(null); // part of WebAudio API
    const analyserNodeRef = useRef(null); // AnalyserNode for real-time frequency analysis
    const bufferLength = useRef(2048); // Fast Fourier Transform Size
    const micRef = useRef(null); // microphone
    const buffer = useRef(new Float32Array(bufferLength.current));


    useEffect(() => {
        const startListening = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                await audioContextRef.current.resume();
                analyserNodeRef.current = audioContextRef.current.createAnalyser();
                analyserNodeRef.current.fftSize = bufferLength.current;
        
                const microphone = audioContextRef.current.createMediaStreamSource(stream);
                microphone.connect(analyserNodeRef.current);
                micRef.current = stream;
        
                detectPitch();
              } catch (err) {
                console.error('Error with microphone, make sure it is enabled:', err);
            }
        };

        if (isRecording) {
            startListening();
        } else {
            // Stop the microphone when not recording
            if (micRef.current) {
                micRef.current.getTracks().forEach(track => track.stop());
                micRef.current = null;
            }
        }

        return () => {
            if (micRef.current) {
                micRef.current.getTracks().forEach(track => track.stop());
            }
          };
      }, [isRecording]);


    const detectPitch = () => {
        if (isRecording) { // Check if recording is active
            // Populate the buffer with the time domain data
            analyserNodeRef.current.getFloatTimeDomainData(buffer.current);
            const detectedPitch = autoCorrelate(buffer.current, audioContextRef.current.sampleRate);
            // console.log(detectedPitch);
            // console.log(buffer.current);
            if (detectedPitch !== -1) {
                setPitch(detectedPitch.toFixed(2));
            } else {
                setPitch(null);
            }
        }
    
        requestAnimationFrame(detectPitch);
    };

    // Autocorrelation function for pitch detection
    // created with the help of ChatGPT + tutorial linked above
    const autoCorrelate = (buffer, sampleRate) => {
        let SIZE = buffer.length;
        let rms = 0;
    
        // Calculate root mean square (RMS) of the buffer
        for (let i = 0; i < SIZE; i++) {
            rms += buffer[i] * buffer[i];
        }
        rms = Math.sqrt(rms / SIZE);
    
        // If the signal is too weak, return -1
        if (rms < 0.01) return -1;
    
        let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    
        // Find the start of the signal above the threshold
        for (let i = 0; i < SIZE / 2; i++) {
            if (Math.abs(buffer[i]) < thres) {
                r1 = i;
                break;
            }
        }
    
        // Find the end of the signal above the threshold
        for (let i = 1; i < SIZE / 2; i++) {
            if (Math.abs(buffer[SIZE - i]) < thres) {
                r2 = SIZE - i;
                break;
            }
        }
    
        // Trim the buffer to the range of the detected signal
        buffer = buffer.slice(r1, r2);
        SIZE = buffer.length;
    
        let c = new Array(SIZE).fill(0);
        
        // Calculate the autocorrelation
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE - i; j++) {
                c[i] = c[i] + buffer[j] * buffer[j + i];
            }
        }
    
        // Find the peak of the autocorrelation function
        let d = 0;
        while (c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;
        for (let i = d; i < SIZE; i++) {
            if (c[i] > maxval) {
                maxval = c[i];
                maxpos = i;
            }
        }
    
        let T0 = maxpos;
    
        // Refine T0 using quadratic interpolation
        let x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
        let a = (x1 + x3 - 2 * x2) / 2;
        let b = (x3 - x1) / 2;
    
        if (a) T0 = T0 - b / (2 * a);
    
        return sampleRate / T0; // Return the detected frequency
    };
    
      
    return (
        <div>
        <h2>Pitch Detector</h2>
        <p>Detected Pitch: {pitch ? `${pitch} Hz` : 'No pitch detected'}</p>
        </div>
    );
};

export default PitchDetector;
