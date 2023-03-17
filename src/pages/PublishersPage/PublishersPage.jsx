import { useState, useEffect, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import PublishersService from '../../API/services/publishers/PublishersService';

import PublishersList from '../../components/PublishersList/PublishersList';
import Loader from '../../components/UI/Loader/Loader';

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
  
  console.log([...publishersList])

  return (
    <div className="page publishers-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Publishers</h2>
        </div>
        <div className="developers-page__wrapper">
          <PublishersList publishersList={publishersList}/>
        </div>
        <div ref={lastElement} className="observer"></div>
        {isLoading && <Loader/>}
      </div>
    </div>
  );
};

export default PublishersPage;