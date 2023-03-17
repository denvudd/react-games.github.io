import GameItem from "../GameItem/GameItem";

import './gamesList.scss';

const GamesList = ({gamesList, page, totalPages, limit}) => {
  return (
    <div className="games-list">
      <ul className="games-list__ul">
        {gamesList.map(game => {
          return (
            <li key={game.id} className="games-list__li">
              <GameItem game={game}/>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default GamesList;