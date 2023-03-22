import { useState, useEffect, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import DevelopersService from '../../API/services/developers/DevelopersService';

import CardList from '../../components/UI/CardList/CardList';
import LoaderContent from '../../components/UI/LoaderContent/LoaderContent';

import { getTotalPageCount } from '../../utils/getTotalPageCount';
import './developersPage.scss';

const DevelopersPage = () => {
  const [developersList, setDevelopersList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [getDevelopers, isLoading, error] = useFetching(async () => {
    const response = await DevelopersService.getDevelopersList(limit, page);
    setDevelopersList([...developersList, ...response.data.results]);

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
    getDevelopers();
  }, [page, limit]);

  return (
    <div className="page developers-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Developers</h2>
        </div>
        <div className="developers-page__wrapper">
          <div className="page__about">
            <div className="page__about-text">
              <p>Here you can find information about the company or individuals who developed the game, 
                including their history, past projects, and any notable achievements. This information can be useful for players who 
                are interested in learning more about the game development process, as well as for those who want to support their 
                favorite developers by purchasing their games.</p>
              <p>This category can also be helpful for players who are looking for new games to play. By browsing through 
                the different developers listed, players can discover new games that share similar styles or themes to their favorite titles. 
                This can help players expand their gaming horizons and find new games that they may not have otherwise discovered.</p>
            </div>
          </div>
          <CardList list={developersList} link="developers" buttonText="More" param="slug"/>
        </div>
        <div ref={lastElement} className="observer"></div>
        {(page < totalPages || isLoading) ? <LoaderContent/> : null}
      </div>
    </div>
  );
};

export default DevelopersPage;