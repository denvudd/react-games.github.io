
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import GamesPage from './pages/GamesPage/GamesPage';
import DevelopersPage from "./pages/DevelopersPage/DevelopersPage";
import SingleGamePage from './pages/SingleGamePage/SingleGamePage';
import SingleDelevoperPage from './pages/SingleDelevoperPage/SingleDelevoperPage';
import './App.scss';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/games" element={<GamesPage/>}></Route>
          <Route path="/games/:slug" element={<SingleGamePage/>}/>
          <Route path="/developers" element={<DevelopersPage/>}/>
          <Route path="/developers/:slug" element={<SingleDelevoperPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
