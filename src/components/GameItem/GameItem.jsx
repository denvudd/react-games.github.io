import { useNavigate } from "react-router-dom";

import Platforms from "../UI/Platforms/Platforms";
import Ratings from "../UI/Ratings/Ratings";

import plus from '../../resources/img/icons/add_white_24dp.svg';

import './gameItem.scss';

const GameItem = ({game}) => {
  const router = useNavigate();
  
  return (
    <div className="game-item">
      <div className="game-item__photo">
        <img src={game.background_image} alt="" />
      </div>
      <div className="game-item__content">
        <Platforms platforms={game.platforms}/>
        <div className="game-item__name">{game.name}</div>
        <div className="game-item__released"><span className="label">Released: </span>{game.released}</div>
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
            <button onClick={() => router(`/games/${game.id}`)} className="game-item__button">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;