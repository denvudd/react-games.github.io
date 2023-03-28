import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useSortGames from '../../hooks/useSortGames';
import { useFetching } from "../../hooks/useFetching";
import { useObserver } from '../../hooks/useObserver';

import GenresService from "../../API/services/genres/GenresService";
import DOMPurify from "dompurify";

import GamesList from "../../components/GamesList/GamesList";
import MySelect from '../../components/UI/MySelect/MySelect';
import Loader from "../../components/UI/Loader/Loader";
import LoaderContent from "../../components/UI/LoaderContent/LoaderContent";
import Error from "../../components/UI/Error/Error";

import { getTotalPageCount } from '../../utils/getTotalPageCount';

import './singleGenrePage.scss';
const SingleGenrePage = () => {
  const [genre, setGenre] = useState({});
  const [gamesList, setGamesList] = useState([]);
  const [displayMode, setDisplayMode] = useState(localStorage.getItem('displayMode') || 'column');
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [platformParam, setPlatformParam] = useState(null);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const sortedGames = useSortGames(filter.sort, gamesList);
  const params = useParams();
  const lastElement = useRef();
  const sanitizedText = DOMPurify.sanitize(genre.description); // text about

  const [getGenre, isGenreLoading, genreError] = useFetching(async () => {
    const response = await GenresService.getGenreBySlug(params.slug);
    setGenre(response.data);
  });

  const [getGames, isGamesLoading, gamesError] = useFetching(async () => {
    const response = await GenresService.getGamesByGenreSlug(params.slug, limit, page);
    setGamesList([...gamesList, ...response.data.results]);
  });

  const [getGamesListWithLimit, isLoadingLimit, errorLimit] = useFetching(async () => {
    const response = await GenresService.getGamesByGenreSlug(params.slug, limit, page);
    setGamesList(response.data.results);

    const totalCount = response.data.count;
    setTotalPages(getTotalPageCount(totalCount, limit))
  });

  const [getGamesByPlatform, isPlatformLoading, platformLimit] = useFetching(async () => {
    const response = await GenresService.getGamesByGenreSlug(params.slug, limit, page, platformParam);
    setGamesList(response.data.results);

    const totalCount = response.data.count;
    setTotalPages(getTotalPageCount(totalCount, limit))
  });

  useObserver(lastElement, page < totalPages, isGamesLoading, () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 500)
  });

  useEffect(() => {
    getGenre();
    getGames();
    window.scrollTo(0, 0);
    
    const mode = localStorage.getItem('displayMode');
    if (mode) {
      setDisplayMode(mode);
    }
  }, [params.slug]);

  useEffect(() => {
    getGames();
  }, [page])

  useEffect(() => {
    getGamesListWithLimit();
  }, [limit]);

  useEffect(() => {
    getGamesByPlatform();
  }, [platformParam]);


  return (
    <div className="page genre-page">
      <div className="container">
        {isGenreLoading 
          ? <Loader/>
          : <div className="genre-page__wrapper">
              <div className="genre-page__main">
                <div className="genre-page__head">
                  <h1 className="genre-page__name">
                    {genre.name} Genre
                  </h1>
                </div>
              </div>
              <div className="genre-page__about">
                {genre.description === '' 
                  ? <div className="genre-page__about-text">There is no information about this developer</div>
                  : <div className="genre-page__about-text" dangerouslySetInnerHTML={{__html: sanitizedText}}></div>
                }
              </div>
              <div className="genre-page__games">
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
                <GamesList displayMode={displayMode} gamesList={sortedGames}/>
                {(genreError || gamesError) && <Error/>}
                <div ref={lastElement} className="observer"></div>
                {(page < totalPages || isGamesLoading) ? <LoaderContent/> : null} 
              </div>
          </div>
        }
      </div>
      <div className="page-art">
        <div className="page-art__wrapper">
          <div 
            className="art" 
            style={{backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${genre.image_background})`}}></div>
        </div>
      </div>
    </div>
  );
};

export default SingleGenrePage;