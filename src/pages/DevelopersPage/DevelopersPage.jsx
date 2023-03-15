import { useState, useEffect } from 'react';
import useSortGames from '../../hooks/useSortGames';

import GamesAPI from '../../API/GamesAPI';

import GamesList from '../../components/GamesList/GamesList';
import MySelect from '../../components/UI/MySelect/MySelect';
import Loader from '../../components/UI/Loader/Loader';

import './developersPage.scss';
import DevelopersList from '../../components/DevelopersList/DevelopersList';

const DevelopersPage = () => {
  const [developersList, setDevelopersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDevelopers();
  }, []);

  const getDevelopers = async () => {
    const response = await GamesAPI.getDevelopersList();
    setDevelopersList(response.data.results);
    setIsLoading(false);
  }
  console.log([...developersList])

  return (
    <div className="page developers-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Developers</h2>
        </div>
        {isLoading 
            ? <Loader/>
            : <div className="developers-page__wrapper">
              <DevelopersList developersList={developersList}/>
            </div>
        }
      </div>
    </div>
  );
};

export default DevelopersPage;