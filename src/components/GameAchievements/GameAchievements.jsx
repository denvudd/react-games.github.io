import { useState, useEffect } from "react";

import GamesAPI from "../../API/GamesAPI";

import Loader from "../../components/UI/Loader/Loader";

import './gameAchievements.scss';

const GameAchievements = ({id}) => {
  const [achievs, setAchievs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAchieves();
  }, []);

  const getAchieves = async () => {
    const response = await GamesAPI.getGameAchiviementsById(id);
    setAchievs(response.data.results);
    setIsLoading(false);
  }

  console.log(achievs);

  return (
    <div className="game-achievements__inner">
      {achievs.map(achieve => {
        return <div className="game-achieve">
          <div className="game-achieve__photo">
            <img src={achieve.image} alt="" />
          </div>
          <div className="game-achieve__text">
            <div className="game-achieve__name">{achieve.name}</div>
            <div className="game-achieve__percent">{achieve.percent}%</div>
            <div className="game-achieve__descr">{achieve.description}</div>
          </div>
        </div>
      })}
    </div>
  );
};

export default GameAchievements;