import React, { useRef, useState } from 'react';

const SyllableEmphasizer = ({ syllables, audioSrc }) => {
  const audioRef = useRef(null);
  const [highlightedSyllable, setHighlightedSyllable] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    setIsPlaying(true);
    const audio = audioRef.current;
    audio.play();

    syllables.forEach(({ syllable, time }) => {
      setTimeout(() => {
        setHighlightedSyllable(syllable);
      }, time);
    });

    // clear highlight
    const totalDuration = Math.max(...syllables.map(s => s.time)) + 1000;
    setTimeout(() => setHighlightedSyllable(null), totalDuration);

    audio.onended = () => {
        setIsPlaying(false);
    };
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        {syllables.map(({ syllable }) => (
          <span
            key={syllable}
            style={{
              color: highlightedSyllable === syllable ? 'red' : 'black',
              marginRight: '0px'
            }}
          >
            {syllable}
          </span>
        ))}
      </h1>
      <audio ref={audioRef} src={audioSrc} />
      <button onClick={playAudio} disabled={isPlaying}>
        {isPlaying ? 'Playing...' : 'Play'}
      </button>
    </div>
  );
};

export default SyllableEmphasizer;
