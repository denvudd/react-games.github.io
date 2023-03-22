import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Platforms from "../UI/Platforms/Platforms";
import Ratings from "../UI/Ratings/Ratings";

import plus from '../../resources/img/icons/add_white_24dp.svg';

import './gameItem.scss';

const GameItem = ({game}) => {
  
  return (
    <div className="game-item">
      <div className="game-item__photo">
        {game.background_image === null 
            ? <img src="http://dummyimage.com/290x180.png/99cccc&text=No+Image" alt="game" />
            : <LazyLoadImage src={game.background_image}
              width={320} height={180}
              placeholderSrc={'https://via.placeholder.com/320x180/f2f2f2/969696.jpeg?text=+'}
              effect="blur"
            />
        }
      </div>
      <div className="game-item__content">
        <Platforms platforms={game.platforms}/>
        <Link to={`/games/${game.slug}`} className="game-item__name">{game.name}</Link>
        {game.released === null 
            ? <div className="game-item__released"><span className="label-none">Released: </span><span className="released-none">none</span></div>
            : <div className="game-item__released"><span className="label">Released: </span>{game.released}</div>
        }
        <div className="game-item__rating">
          <span className="label">Rating: </span>
          <Ratings type={'rating'} rating={game.rating}/>
        </div>
        <div className="game-item__metacritic">
          <span className="label">Metacritic: </span>
          <Ratings type={'metacritic'} metacritic={game.metacritic}/>
        </div>
        <div className="game-item__panel">
          <div className="game-item__added">
            <span className="game-item__added__icon">
              <img src={plus} alt="plus-icon" />
            </span>
            <span className="label-added">{game.added}</span>
          </div>
          <div className="game-item__details">
            <Link to={`/games/${game.slug}`} className="game-item__button">Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;