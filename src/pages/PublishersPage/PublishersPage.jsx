import { useState, useEffect, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import PublishersService from '../../API/services/publishers/PublishersService';

import CardList from '../../components/UI/CardList/CardList';
import LoaderContent from '../../components/UI/LoaderContent/LoaderContent';

import { getTotalPageCount } from '../../utils/getTotalPageCount';
import './publishersPage.scss';

const PublishersPage = () => {
  const [publishersList, setPublishersList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [getPublishers, isLoading, error] = useFetching(async () => {
    const response = await PublishersService.getPublishersList(limit, page);
    setPublishersList([...publishersList, ...response.data.results]);

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
    getPublishers();
  }, [page, limit]);


  return (
    <div className="page publishers-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Publishers</h2>
        </div>
        <div className="publishers-page__wrapper">
        <div className="page__about">
          <div className="page__about-text">
            <p>Here players can find information about the company responsible for publishing the game, including 
              their history, past projects, and any notable achievements. This information can be useful for players who are interested in 
              learning more about the companies involved in the gaming industry.</p>
            <p>This category category can also be helpful for players who are looking for new games to play. By browsing through the different 
              publishers listed, players can discover new games that share similar styles or themes to their favorite titles. This can help 
              players expand their gaming horizons and find new games that they may not have otherwise discovered.</p>
          </div>
          </div>
          <CardList list={publishersList} link="publishers" buttonText="More" param="slug"/>
        </div>
        <div ref={lastElement} className="observer"></div>
        {(page < totalPages || isLoading) ? <LoaderContent/> : null}
      </div>
    </div>
  );
};

export default PublishersPage;