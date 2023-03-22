
import { memo } from "react";
import GameItem from "../GameItem/GameItem";

import './gamesList.scss';

const GamesList = ({gamesList, displayMode}) => {
  return (
    <div className="games-list">
      <ul className={displayMode === 'column' ? 'games-list__ul column' : 'games-list__ul list'}>
        {gamesList.map(game => {
          return (
            <li key={game.id} className={displayMode === 'column' ? 'games-list__li default' : 'games-list__li big'}>
              <GameItem game={game}/>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default memo(GamesList);