import { useState, useEffect } from "react";
import { useFetching } from "../../hooks/useFetching";

import GamesService from "../../API/services/games/GamesService";

import Loader from "../UI/Loader/Loader";
import Error from "../UI/Error/Error";

import './gameAchievements.scss';

const GameAchievements = ({id}) => {
  const [achievs, setAchievs] = useState([]);
  const [getAchieves, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getGameAchiviementsById(id);
    setAchievs(response.data.results);
  });

  useEffect(() => {
    getAchieves();
  }, [id]);

  return (
    <div className="game-achievements__inner">
      {isLoading 
          ? <Loader/>
          : achievs.length !== 0
            ? achievs.map(achieve => {
              return <div key={achieve.id} className="game-achieve">
                <div className="game-achieve__photo">
                  <img src={achieve.image} alt="" />
                </div>
                <div className="game-achieve__text">
                  <div className="game-achieve__name">{achieve.name}</div>
                  <div className="game-achieve__percent">{achieve.percent}%</div>
                  <div className="game-achieve__descr">{achieve.description}</div>
                </div>
              </div>
            })
            : <div>There is no achievements for this game</div>
      }
      {error && <Error/>}
    </div>
  );
};

export default GameAchievements;