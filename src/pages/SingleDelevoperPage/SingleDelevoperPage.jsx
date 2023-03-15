import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSortGames from '../../hooks/useSortGames';

import GamesAPI from "../../API/GamesAPI";
import DOMPurify from "dompurify";

import GamesList from "../../components/GamesList/GamesList";
import MySelect from '../../components/UI/MySelect/MySelect';
import Loader from "../../components/UI/Loader/Loader";

import './singleDelevoperPage.scss';


const GameDelevoperPage = () => {
  const [dev, setDev] = useState({});
  const [gamesList, setGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const sortedGames = useSortGames(filter.sort, gamesList);
  const params = useParams();

  const sanitizedText = DOMPurify.sanitize(dev.description); // text about

  useEffect(() => {
    setIsLoading(true);
    getDeveloper();
    getGames();
    window.scrollTo(0, 0);
  }, [params.slug]);

  const getDeveloper = async () => {
    const response = await GamesAPI.getDeveloperById(params.slug);
    setDev(response.data);
    setIsLoading(false);
  }

  const getGames = async () => {
    const response = await GamesAPI.getGamesByDeveloperId(params.slug);
    setGamesList(response.data.results);
    setIsLoading(false);
  }

  console.log(dev);
  return (
    <div className="page developer-page">
      <div className="container">
        {isLoading 
          ? <Loader/>
          : <div className="developer-page__wrapper">
              <div className="developer-page__main">
                <div className="developer-page__head">
                  <h1 className="developer-page__name">
                    {dev.name} Developer
                  </h1>
                </div>
              </div>
              <div className="developer-page__about">
                {dev.description === '' 
                  ? <div className="developer-page__about-text">There is no information about this developer</div>
                  : <div className="developer-page__about-text" dangerouslySetInnerHTML={{__html: sanitizedText}}></div>
                }
              </div>
              <div className="developer-page__games">
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
                <GamesList gamesList={sortedGames}/>
              </div>
          </div>
        }
      </div>
      <div className="page-art">
        <div className="page-art__wrapper">
          <div 
            className="art" 
            style={{backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${dev.image_background})`}}></div>
        </div>
      </div>
    </div>
  );
};

export default GameDelevoperPage;