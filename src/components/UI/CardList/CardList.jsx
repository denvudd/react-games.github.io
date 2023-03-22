import CardDefault from '../CardDefault/CardDefault';

import './cardList.scss';

const CardList = ({list, link, buttonText, param}) => {
  return (
    <div className="card-list">
      <ul className="card-list__ul">
        {list.map(li => {
          return (
            <li key={li.id} className="card-list__li">
              <CardDefault buttonText={buttonText}
                           src={li}
                           link={link}
                           param={param} />
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default CardList;