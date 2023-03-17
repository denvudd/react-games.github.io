
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './components/Header/Header';
import AppRouter from "./pages/AppRouter";

import './App.scss';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <AppRouter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
