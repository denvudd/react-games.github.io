import { useState, useEffect } from "react";
import { useFetching } from "../../hooks/useFetching";

import GamesService from "../../API/services/games/GamesService";

import Loader from "../UI/Loader/Loader";
import Modal from "../UI/Modal/Modal";
import Error from "../UI/Error/Error";

import { Navigation, Pagination, Scrollbar, FreeMode } from 'swiper';
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
  const [getScreenshots, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getGameScreenshotsById(id);
    setScreenshots(response.data.results);
  });

  useEffect(() => {
    getScreenshots();
  }, [id]);

  const sliderBreakpoints = {
    0: {
      slidesPerView: 'auto',
      freeMode: {enabled: true},
    },
    576: {
      slidesPerView: 3,
      spaceBetween: 10,
      scrollbar: { draggable: true },
    },
  };

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
              modules={[Navigation, Pagination, Scrollbar, FreeMode]}
              spaceBetween={10}
              slidesPerView={3}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              wrapperClass={'screenshots-slider'}
              breakpoints={sliderBreakpoints}
            >
            {error 
                ? <Error/>
                : screenshots.map((screenshot, index) => {
                    return <SwiperSlide key={screenshot.id} onClick={() => handleImageClick(index)}>
                      <img src={screenshot.image} alt="game-screenshot" className="game-screenshot" />
                    </SwiperSlide>
                  })
            }
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
      {error && <Error/>}
    </div>
  );
};

export default GameScreenshots;