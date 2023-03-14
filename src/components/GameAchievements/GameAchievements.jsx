import { useState, useEffect } from "react";

import GamesAPI from "../../API/GamesAPI";

import Loader from "../../components/UI/Loader/Loader";

import './gameAchievements.scss';

const GameAchievements = ({id}) => {
  const [achievs, setAchievs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAchieves();
  }, [id]);

  const getAchieves = async () => {
    const response = await GamesAPI.getGameAchiviementsById(id);
    setAchievs(response.data.results);
    setIsLoading(false);
  }

  return (
    <div className="game-achievements__inner">
      {achievs.length !== 0
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
    </div>
  );
};

export default GameAchievements;