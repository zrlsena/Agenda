import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import 'boxicons';
import NewCardForm from '../components/NewCardForm';
import ScrollReveal from 'scrollreveal'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Team() {

  useEffect(() => {
    ScrollReveal({ reset: true, distance: '60px', duration: 1000, delay: 400 });

  }, []); 
  
  return (
    <div >
      <Navbar />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
    </style>
      <div className="team">
          <h1 className="text-center mb-5" style={{marginTop:'100px',}}>Strut like a star, shine like a boss!</h1>
       <NewCardForm/>
       </div>
    </div>
  );
};

export default Team;