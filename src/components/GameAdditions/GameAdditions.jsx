import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GamesAPI from "../../API/GamesAPI";

import Loader from "../../components/UI/Loader/Loader";
import GameItem from "../GameItem/GameItem";

import './gameAdditions.scss';

const GameAdditions = ({id}) => {
  const [additions, setAdditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAdditions();
  }, [id]);

  const getAdditions = async () => {
    const response = await GamesAPI.getGameAdditionsById(id);
    setAdditions(response.data.results);
    setIsLoading(false);
  }

  const router = useNavigate();

  const showLoader = isLoading;
  const showNoAdditionsMessage = !isLoading && additions.length === 0;
  const showLimitedAdditions = !isLoading && additions.length > 0 && additions.length > 3;
  const showAllAdditions = !isLoading && additions.length > 0 && additions.length <= 3;

  const limitedAdditions = additions.slice(0, 3).map((addition) => (
    <div className="game-addition" key={addition.id}>
      <GameItem game={addition} />
    </div>
  ));
  
  const allAdditions = additions.map((addition) => (
    <div className="game-addition" key={addition.id}>
      <GameItem game={addition} />
    </div>
  ));

  console.log(additions);

  return (
    <div className="game-additions__inner">
      {showLoader && <Loader />}
      {showNoAdditionsMessage && <div>There are no additions for this game</div>}
      {showLimitedAdditions && (
        <>
          {limitedAdditions}
          <div>More</div>
        </>
      )}
      {showAllAdditions && allAdditions}
    </div>
  );
};

export default GameAdditions;