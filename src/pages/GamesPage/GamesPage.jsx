import { useState, useEffect } from 'react';
import useSortGames from '../../hooks/useSortGames';

import GamesAPI from '../../API/GamesAPI';

import GamesList from '../../components/GamesList/GamesList';
import MySelect from '../../components/UI/MySelect/MySelect';
import Loader from '../../components/UI/Loader/Loader';

import './gamesPage.scss';

const GamesPage = () => {
  const [gamesList, setGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const sortedGames = useSortGames(filter.sort, gamesList);

  useEffect(() => {
    getGamesList();
  }, []);

  const getGamesList = async () => {
    const response = await GamesAPI.getGamesList();
    setGamesList(response.data.results);
    setIsLoading(false);
  }
  console.log([...gamesList])
  return (
    <div className="page games-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Best of the bests</h2>
        </div>
        <div className="games-page__wrapper">
          <MySelect
              value={filter.query}
              onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
              defaultValue="Sort by"
              options={[
                {value: 'default', name: 'Default'},
                {value: 'name', name: 'By name'},
                {value: 'released', name: 'By released date'},
                {value: 'rating', name: 'By rating'},
                {value: 'added', name: 'By added'},
              ]}
            />
          {isLoading 
                ? <Loader/> 
                : <GamesList gamesList={sortedGames} />
          }
        </div>
      </div>
    </div>
  );
};

export default GamesPage;