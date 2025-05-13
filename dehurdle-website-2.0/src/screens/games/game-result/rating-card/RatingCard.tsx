import { useState } from 'react';

import { INITIAL_RATING_DATA, RATING } from 'constant';

import { Typography } from '@mui/material';

import './rating-card-styles.scss';

const RatingCard = () => {
  const [ratingData, setRatingData] = useState(INITIAL_RATING_DATA);

  const handleOnPress = (id: RATING) => () => {
    const updatedRatingData = ratingData.map(rating => ({
      ...rating,
      isSelected: rating.id === id,
    }));

    setRatingData(updatedRatingData);
  };

  const renderRatingIcons = () =>
    ratingData.map(rating => {
      const Icon = rating.isSelected ? rating.filledIcon : rating.icon;

      return (
        <div key={rating.id} onClick={handleOnPress(rating.id)}>
          <Icon className="rating-card__icon" />
        </div>
      );
    });

  return (
    <div className="rating-card__container">
      <Typography className="rating-card__title">Help us Improve!</Typography>
      <Typography className="rating-card__description">How was your experience?</Typography>
      <div className="rating-card__sub-container">{renderRatingIcons()}</div>
    </div>
  );
};

export default RatingCard;
