// App.js
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import CameraPage from './components/CameraPage';
import FilterPage from './components/FilterPage.js';
import ResultPage from './components/ResultPage.js';
import PredictionPage from './components/PredictionPage.js';



function App() {
  return (
    <Router>
      <Routes>
      <Route  exact path='/' element={<HomePage/>} />
        <Route exact path='/camera' element={<CameraPage/>} />
        <Route exact path='/Prediction' element={<PredictionPage/>} />
        <Route exact path='/filter' element={<FilterPage/>} />
        <Route exact path='/result' element={<ResultPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
