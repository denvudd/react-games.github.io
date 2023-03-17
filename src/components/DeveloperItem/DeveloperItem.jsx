import { Link } from "react-router-dom";

import './developerItem.scss';

const DeveloperItem = ({dev}) => {

  return (
    <div className="card-item" style={{backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${dev.image_background})`}}>
      <div className="card-item__head">
        <Link to={`/developers/${dev.slug}`} className="card-item__head-name">{dev.name}</Link>
        <div className="card-item__head-buttonMore">
          <Link to={`/developers/${dev.slug}`}>More</Link>
        </div>
      </div>
      <div className="card-item__content">
        <div className="card-item__content">
          <div className="card-item__content-title">Known for {dev.games_count} games</div>
          <ul className="card-item__content-items">
            {dev.games.map(game => {
              return <li key={game.id} className="card-item__content-game">
                <Link to={`/games/${game.slug}`} className="card-item__content-name">{game.name}</Link>
                <span className="card-item__content-added">{game.added}</span>
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeveloperItem;