import React from 'react';

import './ratings.scss';

const Ratings = ({type, rating, metacritic}) => {
  let ratingStatus = '';
  let metacriticStatus = '';

  if (type === 'metacritic') {
    switch(true) {
      case (metacritic >= 80):
        metacriticStatus = 'greenRating';
        break;
      case (metacritic < 80 && metacritic > 50):
        metacriticStatus = 'orangeRating';
        break;
      case (metacritic <= 50):
        metacriticStatus = 'redRating';
        break;
      default: return null;
    }
  }

  if (type === 'rating') {
    switch(true) {
      case (rating >= 4.0):
        ratingStatus = 'greenRating';
        break;
      case (rating < 5.0 && rating >= 3.0):
        ratingStatus = 'orangeRating';
        break;
      case (rating < 3.0):
        ratingStatus = 'redRating';
        break;
      default: return null;
    }
  }

  return (
    <>
      {type === 'rating' 
        ? <span className={"label-rating " + ratingStatus}>
            {rating}
          </span> 
        : <span className={"label-metacritic " + metacriticStatus}>
            {metacritic}
          </span>}
    </>
  );
};

export default Ratings;