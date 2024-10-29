import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Team from '../pages/Team';
import Study from '../pages/Study';
import Health from '../pages/Health';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    
    <body>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/team' element={<Team/>}/>
          <Route path='/study' element={<Study/>}/>
          <Route path='/health' element={<Health/>}/>


        </Routes>
      </BrowserRouter>

      
    
  </body>
  );
}

export default App;
