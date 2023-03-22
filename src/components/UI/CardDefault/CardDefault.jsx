import { Link } from 'react-router-dom';

import './cardDefault.scss';

const CardDefault = ({buttonText, link, src, param}) => {
  return (
    <div className="card-item" style={{backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${src.image_background})`}}>
      <div className="card-item__head">
        <Link to={param === 'slug' ? `/${link}/${src.slug}` : `/${link}/${src.id}`} className="card-item__head-name">{src.name}</Link>
        <div className="card-item__head-buttonMore">
          <Link to={param === 'slug' ? `/${link}/${src.slug}` : `/${link}/${src.id}`}>{buttonText}</Link>
        </div>
      </div>
      <div className="card-item__content">
        <div className="card-item__content">
          <div className="card-item__content-title">Known for {src.games_count} games</div>
          <ul className="card-item__content-items">
            {src.games.map(game => {
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

export default CardDefault;