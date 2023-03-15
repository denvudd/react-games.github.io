import DeveloperItem from '../DeveloperItem/DeveloperItem';

import './developersList.scss';

const DevelopersList = ({developersList}) => {
  return (
    <div className="developers-list">
      <ul className="developers-list__ul">
        {developersList.map(dev => {
          return (
            <li key={dev.id} className="developers-list__li">
              <DeveloperItem dev={dev}/>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default DevelopersList;