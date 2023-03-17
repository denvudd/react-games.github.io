import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";

import GamesService from "../../API/services/games/GamesService";

import Loader from "../../components/UI/Loader/Loader";
import GameItem from "../GameItem/GameItem";

import './gameAdditions.scss';

const GameAdditions = ({id}) => {
  const [additions, setAdditions] = useState([]);
  const [getAdditions, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getGameAdditionsById(id);
    setAdditions(response.data.results);
  });

  useEffect(() => {
    getAdditions();
  }, [id]);

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