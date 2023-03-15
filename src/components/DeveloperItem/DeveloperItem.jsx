import { Link } from "react-router-dom";

import './developerItem.scss';

const DeveloperItem = ({dev}) => {

  return (
    <div className="developer-item" style={{backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${dev.image_background})`}}>
      <div className="developer-item__head">
        <Link to={`/developers/${dev.slug}`} className="developer-item__head-name">{dev.name}</Link>
        <div className="developer-item__head-buttonMore">
          <Link to={`/developers/${dev.slug}`}>More</Link>
        </div>
      </div>
      <div className="developer-item__content">
        <div className="developer-item__content">
          <div className="developer-item__content-title">Known for {dev.games_count} games</div>
          <ul className="developer-item__content-items">
            {dev.games.map(game => {
              return <li key={game.id} className="developer-item__content-game">
                <Link to={`/games/${game.slug}`} className="developer-item__content-name">{game.name}</Link>
                <span className="developer-item__content-added">{game.added}</span>
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeveloperItem;