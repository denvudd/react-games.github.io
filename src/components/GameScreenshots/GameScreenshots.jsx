import { useState, useEffect } from "react";

import GamesAPI from "../../API/GamesAPI";

import Loader from "../../components/UI/Loader/Loader";
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './gameScreenshots.scss';

const GameScreenshots = ({id}) => {
  const [screenshots, setScreenshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getScreenshots();
  }, []);

  const getScreenshots = async () => {
    const response = await GamesAPI.getGameScreenshotsById(id);
    setScreenshots(response.data.results);
    setIsLoading(false);
  }

  return (
    <div className="game-screenshot__inner">
      {isLoading 
          ? <Loader/>
          : <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={10}
          slidesPerView={3}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          wrapperClass={'screenshots-slider'}
          >
         {screenshots.map(screenshot => {
          return <SwiperSlide>
            <img key={screenshot.id} src={screenshot.image} alt="game-screenshot" className="game-screenshot" />
           </SwiperSlide>
         })}
       </Swiper>
      }
      
    </div>
  );
};

export default GameScreenshots;