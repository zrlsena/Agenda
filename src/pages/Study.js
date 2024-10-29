import React from 'react';
import Navbar from "../components/Navbar";
import PomodoroTimer from '../components/PomodoroTimer'; 

function Study() {

    
  return (
    <div >
      <Navbar />
      <div className="study-container">
      <video src='images/sea.mp4' autoPlay loop className="background-video"/>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
    </style>
      <PomodoroTimer />
      </div>
    </div>
  );
}

export default Study;
