import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";

import heroPhoto from '../../resources/img/hero-photo.jpg'
import mainPhoto from '../../resources/img/main-hero.jpeg'

import './mainPage.scss';

function MainPage() {
  

  return (
    <div className="main">
      <div className="main-page__hero">
        <div className="container">
            <div className="main-page__hero-content">
              <div className="main-page__hero-text">
                <h1 className="main-page__hero-text__title">Explore GAME Video Games Database</h1>
                <div className="main-page__hero-text__subtitle">There are two types of companies: hoarders and givers. GAME is the 
                largest video game database and game discovery service. And we are gladly sharing our 500,000+ games, search, and machine 
                learning recommendations with the world.</div>
                <div className="main-page__hero-buttons__wrapper">
                  <Link to="/games-by-rating" className="main-page__hero-button">Go to games</Link>
                </div>
              </div>
              <div className="main-page__hero-photo">
                <LazyLoadImage src={heroPhoto}
                               width={900} height={450}
                               placeholderSrc={'https://via.placeholder.com/900x450/f2f2f2/969696.jpeg?text=+'}
                               effect="blur"
                               alt="hero"
                               className="hero-photo"
                />
              </div>
            </div>
          <div className="page-art">
            <div className="page-art__wrapper">
              <div 
                className="art" 
                style={{backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${mainPhoto})`}}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="page main-page">
        <div className="container">
          <div className="main-page__reasons">
            <h3 className="main-page__reasons-subtitle">Why GAME</h3>
            <h2 className="main-page__reasons-title">500,000+ games for 50 platforms including mobiles</h2>
            <ul className="main-page__reasons-list">
              <li className="main-page__reasons-item">
                <span className="main-page__reasons-item__icon">📷</span>
                <p className="main-page__reasons-item__text">
                  <span className="main-page__reasons-item__counter">2,100,000</span><br></br>screenshots
                </p>
              </li>
              <li className="main-page__reasons-item item-blue">
                <span className="main-page__reasons-item__icon">👍</span>
                <p className="main-page__reasons-item__text">
                  <span className="main-page__reasons-item__counter">1,100,000</span><br></br>ratings
                </p>
              </li>
              <li className="main-page__reasons-item item-white">
                <span className="main-page__reasons-item__icon">🗄️</span>
                <p className="main-page__reasons-item__text">
                  <span className="main-page__reasons-item__counter">220,000</span><br></br>developers
                </p>
              </li>
              <li className="main-page__reasons-item item-blue">
                <span className="main-page__reasons-item__icon">🏷️</span>
                <p className="main-page__reasons-item__text">
                  <span className="main-page__reasons-item__counter">58,000</span><br></br>tags
                </p>
              </li>
              <li className="main-page__reasons-item item-white">
                <span className="main-page__reasons-item__icon">📁</span>
                <p className="main-page__reasons-item__text">
                  <span className="main-page__reasons-item__counter">45,000</span><br></br>publishers
                </p>
              </li>
              <li className="main-page__reasons-item">
                <span className="main-page__reasons-item__icon">👨‍💻</span>
                <p className="main-page__reasons-item__text">
                  <span className="main-page__reasons-item__counter">24,000</span><br></br>people
                </p>
              </li>
            </ul>
            <ul className="main-page__text-reasons">
              <li className="main-page__text-reasons__item">
                <p>Comprehensive video game data: descriptions, genres, release dates, links to stores, ESRB-ratings, average 
                  playtime, Metacritic ratings, official websites, system requirements, DLCs and franchises.</p>
              </li>
              <li className="main-page__text-reasons__item">
                <p>Player activity data: Steam average playtime and GAME player counts and ratings.</p>
              </li>
              <li className="main-page__text-reasons__item">
                <p>Where to buy: links to digital distribution services.</p>
              </li>
              <li className="main-page__text-reasons__item">
                <p>Rapidly growing and getting better by user contribution and our algorithms.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
