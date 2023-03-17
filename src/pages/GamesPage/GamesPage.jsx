import { useState, useEffect, useRef } from 'react';
import useSortGames from '../../hooks/useSortGames';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import GamesService from '../../API/services/games/GamesService';

import GamesList from '../../components/GamesList/GamesList';
import MySelect from '../../components/UI/MySelect/MySelect';
import Loader from '../../components/UI/Loader/Loader';

import { getTotalPageCount } from '../../utils/getTotalPageCount';
import './gamesPage.scss';

const GamesPage = () => {
  const [gamesList, setGamesList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [getGamesList, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getGamesList(limit, page);
    setGamesList([...gamesList, ...response.data.results]);

    const totalCount = response.data.count;
    setTotalPages(getTotalPageCount(totalCount, limit))
  });
  const [filter, setFilter] = useState({sort: '', query: ''});
  const sortedGames = useSortGames(filter.sort, gamesList);
  const lastElement = useRef();

  useObserver(lastElement, page < totalPages, isLoading, () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 500)
  });

  useEffect(() => {
    getGamesList();
  }, [page, limit]);

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
            <GamesList gamesList={sortedGames} 
                       page={page}
                       totalPages={totalPages}
                       limit={limit}
            />
            <div ref={lastElement} className="observer"></div>
            {isLoading && <Loader/>}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;