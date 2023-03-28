import { useState, useEffect } from "react";
import { useFetching } from "../../../hooks/useFetching";

import GamesService from "../../../API/services/games/GamesService";

import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Scrollbar, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import psStore from '../../../resources/img/icons/psStore.svg';
import steamStore from '../../../resources/img/icons/steamStore.svg';
import xboxStore from '../../../resources/img/icons/xboxStore.svg';
import nintendoStore from '../../../resources/img/icons/nintendoStore.svg';
import epicGamesStore from '../../../resources/img/icons/epicgamesStore.svg';
import googlePlayStore from '../../../resources/img/icons/googlePlayStore.svg';
import appleStore from '../../../resources/img/icons/appleStore.svg';
import gogStore from '../../../resources/img/icons/gogStore.svg';
import itchIoStore from '../../../resources/img/icons/itchIoStore.svg';

import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './storesAvailable.scss';

const StoresAvailable = ({stores, id}) => {
  const [urls, setUrls] = useState([]);
  const [getUrls, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getStoreGameById(id);
    setUrls(response.data.results);
  });
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    getUrls();

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [id, stores]);

  const usedIcons = {};
  const storeIcons = {
    'PlayStation Store': psStore,
    'Xbox 360 Store': xboxStore,
    'Xbox Store': xboxStore,
    'Epic Games': epicGamesStore,
    'Steam': steamStore,
    'Nintendo Store': nintendoStore,
    'Google Play': googlePlayStore,
    'App Store': appleStore,
    'GOG': gogStore,
    'itch.io' : itchIoStore,
  };
  
  const mobileSlides = stores.map(store => {
    const url = urls.find(url => url.store_id === store.store.id);
    if (url !== undefined) {
      return (
        <SwiperSlide key={store.store.id}>
          <a className="stores-button"
              href={url.url} 
              target="_blank" rel="noreferrer"
              key={store.store.id}>
              <div>{store.store.name}</div>
              <img src={storeIcons[store.store.name]} alt="store-icon" />
            </a>
        </SwiperSlide>
      ) 
    }
  });

  const desktopStores = stores.map(store => {
    const url = urls.find(url => url.store_id === store.store.id);
    if (url !== undefined) {
      return (
          <a className="stores-button"
              href={url.url} 
              target="_blank" rel="noreferrer"
              key={store.store.id}>
              <div>{store.store.name}</div>
              <img src={storeIcons[store.store.name]} alt="store-icon" />
            </a>
      ) 
    }
  });

  return (
    <div className="stores-inner">
      {isLoading 
      ? <Loader/>
      : isMobile ? (
          <Swiper
            modules={[Scrollbar, FreeMode]}
            spaceBetween={5}
            slidesPerView={"auto"}
            scrollbar={{ draggable: false }}
            freeMode={{enabled: true}}
            wrapperClass={'stores-slider'}
          >
            {error 
              ? <Error/>
              : mobileSlides
            }
          </Swiper>
      )
      : desktopStores}
      {error && <Error/>}
    </div>
  );
};

export default StoresAvailable;