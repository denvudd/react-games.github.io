import { useContext, useState, useEffect, useRef } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useFetching } from "../../hooks/useFetching";
import { useObserver } from "../../hooks/useObserver";

import GamesService from "../../API/services/games/GamesService";
import GamesList from "../../components/GamesList/GamesList";
import LoaderContent from "../../components/UI/LoaderContent/LoaderContent";

import { getTotalPageCount } from '../../utils/getTotalPageCount';

import './searchResultPage.scss';

const SearchResultPage = () => {
  const {searchFormData} = useContext(SearchContext);
  const [results, setResults] = useState([]);
  const [displayMode, setDisplayMode] = useState('list');
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [getSearch, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getGamesListBySearch(searchFormData.query, limit, page);
    setResults(response.data.results);

    const totalCount = response.data.count;
    setTotalPages(getTotalPageCount(totalCount, limit))
  });
  const [getSearchByPage, isPageLoading, pageError] = useFetching(async () => {
    const response = await GamesService.getGamesListBySearch(searchFormData.query, limit, page);
    setResults([...results, ...response.data.results]);

    const totalCount = response.data.count;
    setTotalPages(getTotalPageCount(totalCount, limit))
  });
  const lastElement = useRef();

  useObserver(lastElement, page < totalPages, isLoading, () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 500)
  });

  useEffect(() => {
    getSearch();
    setPage(1);
  }, [searchFormData.query]);

  useEffect(() => {
    getSearchByPage();
  }, [page]);

  console.log(results);
  return (
    <div className="page search-page">
      <div className="container">
        <div className="section-header">
          {searchFormData.query === "" 
              ? <h2 className="section-title">Search</h2>
              : <h2 className="section-title">Search by "{searchFormData.query}"</h2>
          }
          <div className="page__control-display">
            <div className="page__control-display__title">Display options:</div>
            <div className="page__control-display__items">
              <button onClick={() => setDisplayMode('column')} 
                      className={displayMode === 'column' 
                      ? 'page__control-display__option display-column display-active' 
                      : 'page__control-display__option display-column'}></button>
              <button onClick={() => setDisplayMode('list')} 
                      className={displayMode === 'list' 
                      ? 'page__control-display__option display-list display-active' 
                      : 'page__control-display__option display-list'}></button>
            </div>
          </div>
        </div>
        <div className="search-page__wrapper">
        <GamesList gamesList={results} 
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

export default SearchResultPage;