import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); 
  const [isBreak, setIsBreak] = useState(false);
  
  const audio = new Audio('images/bell.mp3'); 

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            if (isBreak) {
              audio.play(); // Ses dosyasını çal
              setIsBreak(false);
              return 25 * 60; // Çalışma süresine geri dön
            } else {
              audio.play(); // Ses dosyasını çal
              setIsBreak(true);
              return 5 * 60; // 5 dakikalık ara
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak, audio]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(25 * 60);
    setIsBreak(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', color:'white', }}>
      <h1>{isBreak ? 'Break Time Bliss!' : 'You better slay, babe!'}</h1>
      <h2>{formatTime(time)}</h2>
      <button style={{fontSize:'14px', textAlign: 'center', marginTop: '10px', padding:'3px', borderRadius:'10px',  }} onClick={handleStartPause}>
        {isActive ? 'Chill Out' : 'Game On'}
      </button>
      <button style={{fontSize:'14px', textAlign: 'center', marginTop: '10px',  padding:'3px', borderRadius:'10px', marginLeft:'10px', }} onClick={handleReset}>Reset</button>
    </div>
  );
};

export default PomodoroTimer;
