import { useState, useEffect, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import GenresService from '../../API/services/genres/GenresService';

import CardList from '../../components/UI/CardList/CardList';
import LoaderContent from '../../components/UI/LoaderContent/LoaderContent';

import { getTotalPageCount } from '../../utils/getTotalPageCount';
import './genresPage.scss';

const GenresPage = () => {
  const [genresList, setGenresList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [getGenres, isLoading, error] = useFetching(async () => {
    const response = await GenresService.getGenresList(limit, page);
    setGenresList([...genresList, ...response.data.results]);

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
    getGenres();
  }, [page, limit]);

  return (
    <div className="page genres-page">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Genres</h2>
      </div>
      <div className="genres-page__wrapper">
        <div className="page__about">
            <div className="page__about-text">
              <p>Here players can find a variety of games ranging from action, adventure, sports, puzzle,
                 racing, role-playing games, and more. Each genre offers a unique gameplay experience, allowing players to immerse 
                 themselves in different worlds and engage with different challenges and mechanics.</p>
              <p>This category can be helpful for players who are looking for new games to play or want to explore different types 
                of games. By browsing through the different genres, players can discover new games that match their preferred gameplay 
                mechanics or themes. This can help players expand their gaming horizons and find new games that they may not 
                have otherwise discovered.</p>
            </div>
          </div>
        <CardList list={genresList} link="genres" buttonText="More" param="slug"/>
      </div>
      <div ref={lastElement} className="observer"></div>
      {(page < totalPages || isLoading) ? <LoaderContent/> : null}
    </div>
  </div>
  );
};

export default GenresPage;