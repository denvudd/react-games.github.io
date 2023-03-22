import { useState, useEffect } from "react";
import { useFetching } from "../../hooks/useFetching";
import { Link } from "react-router-dom";

import DevelopersService from "../../API/services/developers/DevelopersService";

import Loader from "../UI/Loader/Loader";
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './gameDevs.scss';

const GameDevs = ({id}) => {
  const [devs, setDevs] = useState([]);
  const [getDevs, isLoading, error] = useFetching(async () => {
    const response = await DevelopersService.getDevelopersGameById(id);
    setDevs(response.data.results);
  });

  useEffect(() => {
    getDevs();
  }, [id]);

  const swiperParams = {
    modules: [Navigation, Pagination],
    spaceBetween: 12,
    slidesPerView: 3,
    navigation: true,
    wrapperClass: 'devs-slider',
  };

  const swiperContent = devs.length !== 0
    ? <Swiper
    {...swiperParams}
      >
      {
        devs.slice(0, 5).map(dev => {
          return <SwiperSlide key={dev.id}>
            <div className="game-developer" style={{backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${dev.image_background})`}}>
              <div className="game-developer__head">
                <div className="game-developer__head-photo">
                  <img src={
                    dev.image === null ? 'https://w7.pngwing.com/pngs/336/946/png-transparent-avatar-user-medicine-surgery-patient-avatar-face-heroes-head.png' : dev.image
                  } alt="developer" />
                </div>
                <div className="game-developer__head-name">
                  <a href="#">{dev.name}</a></div>
                  <div className="game-developer__head-positions">
                    {dev.positions.map((position, index, array) => {
                      if ((index + 1) !== array.length) {
                        return <div key={position.id} 
                          className="game-developer__head-position">
                            {position.name.charAt(0).toUpperCase() + position.name.slice(1)},
                        </div>
                      } else {
                        return <div key={position.id} 
                          className="game-developer__head-position">
                            {position.name.charAt(0).toUpperCase() + position.name.slice(1)}
                        </div>
                      }   
                    })}
                  </div>
              </div>
              <div className="card-item__content">
                <div className="card-item__content-title">Known for {dev.games_count} games</div>
                <ul className="card-item__content-items">
                  {dev.games.map(game => {
                    return <li key={game.id} className="card-item__content-game">
                      <Link to={`/games/${game.slug}`} className="card-item__content-name">{game.name}</Link>
                      <span className="card-item__content-added">{game.added}</span>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        })
      }
      <SwiperSlide>
        <div className="game-developer">
          <a href="#" className="game-developer__button-more">
            <button>More</button>
          </a>
        </div>
      </SwiperSlide>
    </Swiper>
    : <div>There is no creators for this game</div>

  return (
    <div className="game-devs__inner">
      {isLoading
          ? <Loader/>
          : swiperContent
      }
    </div>
  );
};

export default GameDevs;