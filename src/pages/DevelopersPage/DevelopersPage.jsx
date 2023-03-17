import { useState, useEffect, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import DevelopersService from '../../API/services/developers/DevelopersService';

import DevelopersList from '../../components/DevelopersList/DevelopersList';
import Loader from '../../components/UI/Loader/Loader';

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

  console.log([...developersList])

  return (
    <div className="page developers-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Developers</h2>
        </div>
        <div className="developers-page__wrapper">
          <DevelopersList developersList={developersList}/>
        </div>
        <div ref={lastElement} className="observer"></div>
        {isLoading && <Loader/>}
      </div>
    </div>
  );
};

export default DevelopersPage;