import { useState, useEffect } from 'react';
import useSortGames from '../../hooks/useSortGames';

import GamesAPI from '../../API/GamesAPI';

import GamesList from '../../components/GamesList/GamesList';
import MySelect from '../../components/UI/MySelect/MySelect';
import Loader from '../../components/UI/Loader/Loader';

import './mainPage.scss';

function MainPage() {
  

  return (
    <div className="main-page">
      <h1>Hello!</h1>
    </div>
  );
}

export default MainPage;
