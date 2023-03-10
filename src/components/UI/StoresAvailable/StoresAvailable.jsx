import React from 'react';

import psStore from '../../../resources/img/icons/psStore.svg';
import steamStore from '../../../resources/img/icons/steamStore.svg';
import xboxStore from '../../../resources/img/icons/xboxStore.svg';
import nintendoStore from '../../../resources/img/icons/nintendoStore.svg';
import epicGamesStore from '../../../resources/img/icons/epicgamesStore.svg';

import './storesAvailable.scss';

const StoresAvailable = ({stores}) => {
  const usedIcons = {};
  const storeIcons = {
    'PlayStation Store': psStore,
    'Xbox 360 Store': xboxStore,
    'Xbox Store': xboxStore,
    'Epic Games': epicGamesStore,
    'Steam': steamStore,
    'Nintendo Store': nintendoStore,
  };
  
  return (
    <div className="stores-inner">
      {stores.map(store => {
        const iconPath = storeIcons[store.store.name];
        if (iconPath && !usedIcons[iconPath]) { // if icon has not been displayed yet
          usedIcons[iconPath] = true;
          if (store.url.length === 0) {
            return <a className="stores-button"
                      href={'http://' + store.store.domain} 
                      target="_blank" rel="noreferrer"
                      key={store.store.id}>
                <div>{store.store.name}</div>
                <img src={storeIcons[store.store.name]} alt="store-icon" />
            </a>
          } else {
            return <a className="stores-button"
                      href={store.url} 
                      target="_blank" 
                      rel="noreferrer"
                      key={store.store.id}>
               <div>{store.store.name}</div>
               <img src={storeIcons[store.store.name]} alt="store-icon" />
            </a>
          } 
        } else {
          return null;
        }            
      })}
    </div>
  );
};

export default StoresAvailable;