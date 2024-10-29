import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ScrollReveal from 'scrollreveal'; 
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'; 


function About() {

  useEffect(() => {
    ScrollReveal({ reset: true, distance: '60px', duration: 2500, delay: 400 });

    ScrollReveal().reveal('.main-title', { delay: 500, origin: 'left' });
    
  }, []); 

  return (
  <div>
    <Navbar/>
    <body>
        <h2 className="main-title">Colors</h2>
        <h1 
        style={{
          color: 'white',       
          fontSize: '48px',     
          textAlign: 'center',   
          marginTop:'120px',  
          padding:'80px',     
          display: 'flex',       
          justifyContent: 'center', 
          alignItems: 'center',   
      }}
        >I can do whatever I want!</h1>
    </body>
  </div>
  );
}

export default About;