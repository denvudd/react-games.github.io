import { useState, useEffect } from "react";
import { useFetching } from "../../../hooks/useFetching";

import GamesService from "../../../API/services/games/GamesService";

import Loader from "../../../components/UI/Loader/Loader";

import psStore from '../../../resources/img/icons/psStore.svg';
import steamStore from '../../../resources/img/icons/steamStore.svg';
import xboxStore from '../../../resources/img/icons/xboxStore.svg';
import nintendoStore from '../../../resources/img/icons/nintendoStore.svg';
import epicGamesStore from '../../../resources/img/icons/epicgamesStore.svg';
import googlePlayStore from '../../../resources/img/icons/googlePlayStore.svg';
import appleStore from '../../../resources/img/icons/appleStore.svg';
import gogStore from '../../../resources/img/icons/gogStore.svg';

import './storesAvailable.scss';

const StoresAvailable = ({stores, id}) => {
  const [urls, setUrls] = useState([]);
  const [getUrls, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getStoreGameById(id);
    setUrls(response.data.results);
  });

  useEffect(() => {
    getUrls();
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
  };
  
  return (
    <div className="stores-inner">
      {isLoading 
          ? <Loader/>
          : stores.map(store => {
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
            
          })
      }
    </div>
  );
};

export default StoresAvailable;