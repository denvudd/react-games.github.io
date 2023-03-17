import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSortGames from '../../hooks/useSortGames';
import { useFetching } from "../../hooks/useFetching";

import PublishersService from "../../API/services/publishers/PublishersService";
import DOMPurify from "dompurify";

import GamesList from "../../components/GamesList/GamesList";
import MySelect from '../../components/UI/MySelect/MySelect';
import Loader from "../../components/UI/Loader/Loader";

import './singlePublisherPage.scss';

const SinglePublisherPage = () => {
  const [publisher, setPublisher] = useState({});
  const [gamesList, setGamesList] = useState([]);
  const [getPublisher, isPublisherLoading, publisherError] = useFetching(async () => {
    const response = await PublishersService.getPublisherBySlug(params.slug);
    setPublisher(response.data);
  });
  const [getGames, isGamesLoading, gamesError] = useFetching(async () => {
    const response = await PublishersService.getGamesByPublisherSlug(params.slug);
    setGamesList(response.data.results);
  });
  const [filter, setFilter] = useState({sort: '', query: ''});
  const sortedGames = useSortGames(filter.sort, gamesList);
  const params = useParams();

  const sanitizedText = DOMPurify.sanitize(publisher.description); // text about

  useEffect(() => {
    getPublisher();
    getGames();
    window.scrollTo(0, 0);
  }, [params.slug]);

  return (
    <div className="page publisher-page">
      <div className="container">
        {isPublisherLoading 
          ? <Loader/>
          : <div className="publisher-page__wrapper">
              <div className="publisher-page__main">
                <div className="publisher-page__head">
                  <h1 className="publisher-page__name">
                    {publisher.name} publisher
                  </h1>
                </div>
              </div>
              <div className="publisher-page__about">
                {publisher.description === '' 
                  ? <div className="publisher-page__about-text">There is no information about this publisher</div>
                  : <div className="publisher-page__about-text" dangerouslySetInnerHTML={{__html: sanitizedText}}></div>
                }
              </div>
              <div className="publisher-page__games">
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
                {isGamesLoading
                    ? <Loader/>
                    : <GamesList gamesList={sortedGames}/>
                }
              </div>
          </div>
        }
      </div>
      <div className="page-art">
        <div className="page-art__wrapper">
          <div 
            className="art" 
            style={{backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${publisher.image_background})`}}></div>
        </div>
      </div>
    </div>
  );
};

export default SinglePublisherPage;