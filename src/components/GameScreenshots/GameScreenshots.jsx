import { useState, useEffect } from "react";

import GamesAPI from "../../API/GamesAPI";

import Loader from "../../components/UI/Loader/Loader";
import Modal from "../UI/Modal/Modal";

import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageGallery from 'react-image-gallery';

import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'react-image-gallery/styles/scss/image-gallery.scss';

import './gameScreenshots.scss';

const GameScreenshots = ({id}) => {
  const [screenshots, setScreenshots] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getScreenshots();
  }, [id]);

  const getScreenshots = async () => {
    const response = await GamesAPI.getGameScreenshotsById(id);
    setScreenshots(response.data.results);
    setIsLoading(false);
  }

  const handleImageClick = (index) => {
    setShowGallery(true);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseGallery = () => {
    setShowGallery(false);
    document.body.style.overflow = 'auto';
  };

  const galleryImages = screenshots.map((screenshot) => ({
    original: screenshot.image,
    thumbnail: screenshot.image,
  }));

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
              return <SwiperSlide key={screenshot.id} onClick={() => handleImageClick(index)}>
                <img src={screenshot.image} alt="game-screenshot" className="game-screenshot" />
              </SwiperSlide>
            })}
         </Swiper>
      }
      {showGallery && (
        <Modal handleClose={handleCloseGallery}>
            <ImageGallery
              items={galleryImages}
              startIndex={selectedIndex}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={true}
              loading={true}
              showBullets={true}
              showIndex={true}
              indexSeparator="of"
            />
        </Modal>
      )}
    </div>
  );
};

export default GameScreenshots;