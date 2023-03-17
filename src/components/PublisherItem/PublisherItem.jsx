import { Link } from "react-router-dom";

const PublisherItem = ({publisher}) => {

  console.log(publisher);
  return (
    <div className="card-item" style={{backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${publisher.image_background})`}}>
      <div className="card-item__head">
        <Link to={`/publishers/${publisher.slug}`} className="card-item__head-name">{publisher.name}</Link>
        <div className="card-item__head-buttonMore">
          <Link to={`/publishers/${publisher.slug}`}>More</Link>
        </div>
      </div>
      <div className="card-item__content">
        <div className="card-item__content">
          <div className="card-item__content-title">Known for {publisher.games_count} games</div>
          <ul className="card-item__content-items">
            {publisher.games.map(game => {
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

export default PublisherItem;