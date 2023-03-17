
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";

import GamesService from "../../API/services/games/GamesService";
import DOMPurify from "dompurify";

import GameScreenshots from "../../components/GameScreenshots/GameScreenshots";
import GameAchievements from "../../components/GameAchievements/GameAchievements";
import GameDevs from "../../components/GameDevs/GameDevs";
import GameRedditPosts from "../../components/GameRedditPosts/GameRedditPosts";
import GameAdditions from "../../components/GameAdditions/GameAdditions";

import Platforms from "../../components/UI/Platforms/Platforms";
import Loader from "../../components/UI/Loader/Loader";
import Ratings from "../../components/UI/Ratings/Ratings";
import StoresAvailable from "../../components/UI/StoresAvailable/StoresAvailable";
import Requirements from "../../components/UI/Requirements/Requirements";

import './singleGamePage.scss';

const GamePage = () => {
  const params = useParams();
  const [game, setGame] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [getGamesList, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getGameBySlug(params.slug);
    setGame(response.data);
  });
  
  const sanitizedText = DOMPurify.sanitize(game.description); // text about

  useEffect(() => {
    getGamesList();
    window.scrollTo(0, 0);
  }, [params.slug]);

  console.log(game);


  return (
    <div className="page game-page">
      <div className="container">
      {isLoading 
          ? <Loader/>
          : <div className="game-page__wrapper">
              <div className="game-page__main">
                <div className="game-page__head">
                  <div className="game-page__head-date">{game.released}</div>
                  <div className="game-page__head-platforms"><Platforms platforms={game.platforms}/></div>
                  <div className="game-page__head-genres">{game.genres.map(genre => {
                    return <div key={genre.id} className="genre">{genre.name}</div>
                  })}</div>
                  <div className="game-page__head-playtime">Average playtime: {game.playtime} hours</div>
                </div>
                <h1 className="game-page__name">{game.name}</h1>
                <div className="game-page__ratings">
                  <div className="game-page__ratings-default">
                    <Ratings type="rating" rating={game.rating}/>
                    <Ratings type="metacritic" metacritic={game.metacritic}/>
                  </div>
                  {game.ratings.length < 3 
                    ? <div className="game-page__ratings-users">
                        <div className="rating-users">Not rated yet 😴</div>
                      </div>
                    : <div className="game-page__ratings-users">
                        <div className="rating-users">🎯 {game.ratings[0].count}</div>
                        <div className="rating-users">👍 {game.ratings[1].count}</div>
                        <div className="rating-users">😐 {game.ratings[2].count}</div>
                        <div className="rating-users">⛔ {game.ratings[3].count}</div>
                      </div>
                  }
                </div>
              </div>
              <div className="game-page__stores">
                <h2 className="game-page__stores-head">Where to buy</h2>
                <StoresAvailable stores={game.stores} id={game.id}/>
              </div>
              <div className="game-page__about">
                <h2 className="page__title">About</h2>
                <div className="game-page__about-text">
                  {expanded 
                      ? <>
                          <span dangerouslySetInnerHTML={
                            {__html: sanitizedText}
                          }></span>
                          <button className="expand" 
                                  onClick={() => setExpanded(!expanded)}>Show Less...</button></>
                      : (
                        <>
                          <span dangerouslySetInnerHTML={
                            {__html: sanitizedText.slice(0, sanitizedText.indexOf('.')) + '...'}
                          }></span>
                          <button className="expand" 
                                  onClick={() => setExpanded(!expanded)}>Show More...</button>
                        </>
                        )
                  }
                 
                </div>
              </div>
              <div className="game-page__meta">
                <div className="game-page__meta-block">
                  <div className="game-page__meta-title">Platforms</div>
                  <div className="game-page__meta-info">
                    {game.platforms.map((platform, index, array) => {
                    if ((index + 1) !== array.length) {
                      return <div key={platform.id} className="game-page__meta-link"><a href="#">{platform.platform.name},</a></div> 
                    } else {
                      return <div key={platform.id} className="game-page__meta-link"><a href="#">{platform.platform.name}</a></div> 
                    }
                    })}
                  </div>
                </div>
                <div className="game-page__meta-block">
                  <div className="game-page__meta-title">Genre</div>
                  <div className="game-page__meta-info">
                    {game.genres.map((genre, index, array) => {
                      if ((index + 1) !== array.length) {
                        return <div key={genre.id} className="game-page__meta-link"><a href="#">{genre.name},</a></div> 
                      } else {
                        return <div key={genre.id} className="game-page__meta-link"><a href="#">{genre.name}</a></div> 
                      }
                    })}
                  </div>
                </div>
                <div className="game-page__meta-block">
                  <div className="game-page__meta-title">Release date</div>
                  <div className="game-page__meta-info">
                    {game.tba 
                        ? <div className="game-page__meta-text">TBA</div>
                        : <div className="game-page__meta-text">{game.released}</div>
                    }
                  </div>
                </div>
                <div className="game-page__meta-block">
                  <div className="game-page__meta-title">Developers</div>
                  <div className="game-page__meta-info">
                    {game.developers.map((dev, index, array) => {
                      if ((index + 1) !== array.length) {
                        return <div key={dev.id} className="game-page__meta-link"><Link to={`/developers/${dev.slug}`}>{dev.name},</Link></div> 
                      } else {
                        return <div key={dev.id} className="game-page__meta-link"><Link to={`/developers/${dev.slug}`}>{dev.name}</Link></div> 
                      }
                    })}
                  </div>
                </div>
                <div className="game-page__meta-block">
                  <div className="game-page__meta-title">Publisher</div>
                  <div className="game-page__meta-info">
                    {game.publishers.map((publ, index, array) => {
                      if ((index + 1) !== array.length) {
                        return <div key={publ.id} className="game-page__meta-link"><Link to={`/publishers/${publ.slug}`}>{publ.name},</Link></div> 
                      } else {
                        return <div key={publ.id} className="game-page__meta-link"><Link to={`/publishers/${publ.slug}`}>{publ.name}</Link></div> 
                      }
                    })}
                  </div>
                </div>
                <div className="game-page__meta-block">
                  <div className="game-page__meta-title">Age rating</div>
                  <div className="game-page__meta-info">
                    <div className="game-page__meta-text">{
                      game.esrb_rating === null ? <span className="rating-none">-</span> : game.esrb_rating.name
                    }</div>
                  </div>
                </div>
                <div className="game-page__meta-block meta-big">
                  <div className="game-page__meta-title">Website</div>
                  <div className="game-page__meta-info">
                    <div className="game-page__meta-link"><a href={game.website}>{game.website}</a></div> 
                  </div>
                </div>
                <div className="game-page__meta-block meta-big">
                  <div className="game-page__meta-title">Tags</div>
                  <div className="game-page__meta-info">
                    {game.tags.map(tag => {
                      return <div key={tag.id} className="game-page__meta-tag"><a href="">{tag.name}</a></div> 
                    })}
                  </div>
                </div>
              </div>
              <div className="game-page__reqs">
                <h2 className="page__title">System requirements for PC</h2>
                <div className="game-page__reqs-inner">
                  {game.platforms.map(platform => {
                    if (platform.platform.name === 'PC') {
                      return <>
                        <Requirements platform={platform} type={'Minimal'} req={platform.requirements.minimum}/>
                        <Requirements platform={platform} type={'Recommended'} req={platform.requirements.recommended}/>
                      </>
                    }
                  })}
                </div>
              </div>
              <div className="game-page__media">
                <h2 className="page__title">Media</h2>
                <div className="game-page__screenshots">
                  <h2 className="game-page__screenshots-title">Screenshots</h2>
                  <GameScreenshots id={game.id}/>
                </div>
              </div>
              <div className="game-page__developers">
                <h2 className="page__title">{game.name} created by</h2>
                <GameDevs id={game.id}/>
              </div>
              <div className="game-page__achievements">
                <h2 className="page__title">The Rarest Achievements</h2>
                <GameAchievements id={game.id}/>
              </div>
              <div className="game-page__reddit">
                <div className="game-page__reddit-head">
                  <h2 className="page__title">Reddit Posts</h2>
                  {game.reddit_count !== 0 
                      ? <>
                          <div className="game-page__reddit-count">{game.reddit_count} posts</div>
                          <span className="game-page__reddit-separator">|</span>
                          <a className="game-page__reddit-buttonMore" href={game.reddit_url}>View All</a>
                        </>
                      : null
                  }
                  
                </div>
                {game.reddit_count !== 0
                    ? <div className="game-page__reddit-meta">
                        <div className="game-page__reddit-meta__head">
                          <span className="game-page__reddit-name"><span className="game-page__reddit-label">Subreddit name: </span>{game.reddit_name}</span>
                        </div>
                        <div className="game-page__reddit-description"><span className="game-page__reddit-label">Description: </span>{game.reddit_description}</div>
                      </div>
                    : null
                }
                <GameRedditPosts id={game.id}/>
              </div>
              <div className="game-page__additions">
              <div class="page-art__additional" style={{backgroundImage: `radial-gradient(closest-side at center center, transparent, rgb(21, 21, 21)), url(${game.background_image_additional})`}}></div>
                <h2 className="page__title">Additions for {game.name}</h2>
                <GameAdditions id={game.id}/>
              </div>
            </div>
      }
      </div>
      <div className="page-art">
        <div className="page-art__wrapper">
          <div 
            className="art" 
            style={{backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${game.background_image})`}}></div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;