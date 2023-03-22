import { useState, useEffect, useRef } from 'react';
import useSortGames from '../../hooks/useSortGames';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import GamesService from '../../API/services/games/GamesService';

import GamesList from '../../components/GamesList/GamesList';
import MySelect from '../../components/UI/MySelect/MySelect';
import LoaderContent from '../../components/UI/LoaderContent/LoaderContent';

import { getTotalPageCount } from '../../utils/getTotalPageCount';

const PopularGamesPage = () => {
  const [gamesList, setGamesList] = useState([]);
  const [displayMode, setDisplayMode] = useState(localStorage.getItem('displayMode') || 'column');
  const [platformParam, setPlatformParam] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [getGamesList, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getGamesList(limit, page);
    setGamesList([...gamesList, ...response.data.results]);

    const totalCount = response.data.count;
    setTotalPages(getTotalPageCount(totalCount, limit))
  });
  const [getGamesListWithLimit, isLoadingLimit, errorLimit] = useFetching(async () => {
    const response = await GamesService.getGamesList(limit, page);
    setGamesList(response.data.results);

    const totalCount = response.data.count;
    setTotalPages(getTotalPageCount(totalCount, limit))
  });
  const [getGamesByPlatform, isPlatformLoading, platformLimit] = useFetching(async () => {
    const response = await GamesService.getGamesList(limit, page, platformParam);
    setGamesList(response.data.results);

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

    const mode = localStorage.getItem('displayMode');
    if (mode) {
      setDisplayMode(mode);
    }
  }, [page]);

  useEffect(() => {
    getGamesListWithLimit();
  }, [limit]);

  useEffect(() => {
    getGamesByPlatform();
  }, [platformParam]);
  
  return (
    <div className="page games-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular by users</h2>
        </div>
        <div className="games-page__wrapper">
          <div className="page__control">
            <div className="page__control-filters">
              <MySelect
                value={filter.query}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sort by"
                options={[
                  {value: 'default', name: 'Default'},
                  {value: 'name', name: 'By name'},
                  {value: 'released', name: 'By released date'},
                  {value: 'rating', name: 'By user rating'},
                  {value: 'metacritic', name: 'By metacritic'},
                  {value: 'added', name: 'By added'},
                ]}
              />
               <MySelect
                value={filter.query}
                onChange={selectedSort => setPlatformParam(selectedSort)}
                defaultValue="Platform"
                options={[
                  {value: null, name: 'Default'},
                  {value: 4, name: 'Windows'},
                  {value: 5, name: 'macOS'},
                  {value: 6, name: 'Linux'},
                  {value: 187, name: 'PlayStation 5'},
                  {value: 18, name: 'PlayStation 4'},
                  {value: 16, name: 'PlayStation 3'},
                  {value: 1, name: 'Xbox One'},
                  {value: 14, name: 'Xbox 360'},
                  {value: 7, name: 'Nintendo Switch'},
                  {value: 3, name: 'iOS'},
                  {value: 21, name: 'Android'},
                  {value: 171, name: 'Web'},
                ]}
              />
              <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Page size"
                options={[
                  {value: 'default', name: 'Default'},
                  {value: 15, name: '15 games'},
                  {value: 10, name: '10 games'},
                  {value: 5, name: '5 games'},
                ]}
              />
            </div>
            <div className="page__control-display">
                <div className="page__control-display__title">Display options:</div>
                <div className="page__control-display__items">
                  <button onClick={() => {
                          localStorage.setItem('displayMode', 'column');
                          setDisplayMode('column');
                        }} 
                        className={displayMode === 'column' 
                        ? 'page__control-display__option display-column display-active' 
                        : 'page__control-display__option display-column'}>
                  </button>
                  <button onClick={() => {
                          localStorage.setItem('displayMode', 'list');
                          setDisplayMode('list');
                        }} 
                        className={displayMode === 'list' 
                        ? 'page__control-display__option display-list display-active' 
                        : 'page__control-display__option display-list'}>
                  </button>
                </div>
            </div>
          </div>
            <GamesList gamesList={sortedGames} 
                       page={page}
                       totalPages={totalPages}
                       limit={limit}
                       displayMode={displayMode}
            />
            <div ref={lastElement} className="observer"></div>
            {(page < totalPages || isLoading) ? <LoaderContent/> : null}
        </div>
      </div>
    </div>
  );
};

export default PopularGamesPage;