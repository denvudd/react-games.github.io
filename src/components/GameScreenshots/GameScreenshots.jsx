import { useState, useEffect } from "react";

import GamesAPI from "../../API/GamesAPI";

import Loader from "../../components/UI/Loader/Loader";
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/scss/image-gallery.scss';
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './gameScreenshots.scss';

const GameScreenshots = ({id}) => {
  const [screenshots, setScreenshots] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getScreenshots();
  }, []);

  const getScreenshots = async () => {
    const response = await GamesAPI.getGameScreenshotsById(id);
    setScreenshots(response.data.results);
    setIsLoading(false);
  }

  const handleImageClick = (index) => {
    setShowGallery(true);
    setSelectedIndex(index);
  };

  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  const galleryImages = screenshots.map((screenshot) => ({
    original: screenshot.image,
    thumbnail: screenshot.image,
  }));

  console.log(screenshots);
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
            {screenshots.map((screenshot, index) => {
              return <SwiperSlide onClick={() => handleImageClick(index)}>
                <img key={screenshot.id} src={screenshot.image} alt="game-screenshot" className="game-screenshot" />
              </SwiperSlide>
            })}
         </Swiper>
      }
      {showGallery && (
        <div className="gallery-modal">
          <div className="gallery-modal-overlay" onClick={handleCloseGallery} />
          <div className="gallery-modal-content">
            <ImageGallery
              items={galleryImages}
              startIndex={selectedIndex}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              loading={true}
              showBullets={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreenshots;