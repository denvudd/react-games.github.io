import PublisherItem from '../PublisherItem/PublisherItem';

import './publishersList.scss';

const PublishersList = ({publishersList}) => {
  return (
    <div className="publishers-list">
      <ul className="publishers-list__ul">
        {publishersList.map(publisher => {
          return (
            <li key={publisher.id} className="publishers-list__li">
              <PublisherItem publisher={publisher}/>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default PublishersList;