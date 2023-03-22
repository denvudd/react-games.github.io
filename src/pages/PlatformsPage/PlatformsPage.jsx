import { useState, useEffect, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import PlatformsService from '../../API/services/platforms/PlatformsService';

import CardList from '../../components/UI/CardList/CardList';
import LoaderContent from '../../components/UI/LoaderContent/LoaderContent';

import { getTotalPageCount } from '../../utils/getTotalPageCount';
import './platformsPage.scss';

const PlatformsPage = () => {
  const [platformsList, setPlatformsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [getPlatforms, isLoading, error] = useFetching(async () => {
    const response = await PlatformsService.getPlatformsList(limit, page);
    setPlatformsList([...platformsList, ...response.data.results]);

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
    getPlatforms();
  }, [page, limit]);
  
  return (
    <div className="page platforms-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Platforms</h2>
        </div>
        <div className="platforms-page__wrapper">
        <div className="page__about">
          <div className="page__about-text">
            <p>Here players can find information about the different platforms on which the 
              game is available, including their technical requirements, compatible devices, and any specific features 
              or limitations. This information can be helpful for players who are interested in buying a game but need 
              to know if their device can run it.</p>
            <p>This category can also be helpful for players who are looking for new games to play on a specific device. 
              By selecting a platform that matches their device, players can quickly find games that are compatible with their device
               and explore new games that they may not have otherwise discovered.</p>
          </div>
          </div>
          <CardList list={platformsList} link="platforms" buttonText="More" param="id"/>
        </div>
        <div ref={lastElement} className="observer"></div>
        {(page < totalPages || isLoading) ? <LoaderContent/> : null}
      </div>
    </div>
  );
};

export default PlatformsPage;