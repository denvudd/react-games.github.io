import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";


import './App.css';
import MainPage from './pages/MainPage/MainPage';
import GamePage from './pages/GamePage/GamePage';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/games/:id" element={<GamePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
