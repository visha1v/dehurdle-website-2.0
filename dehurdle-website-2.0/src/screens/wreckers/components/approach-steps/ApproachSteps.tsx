import { BlueStarImage, PinkStarImage } from 'assets';
import { APPROACH_STEPS } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import ApproachStepCard from './approach-step-card/ApproachStepCard';
import './approachSteps-styles.scss';

const ApproachSteps = () => {
  const renderCards = () => {
    return APPROACH_STEPS.map(cardData => <ApproachStepCard key={cardData.id} {...cardData} />);
  };

  return (
    <div className="approach-steps__container">
      <BlueStarImage className="approach-steps__blue-star" />
      <Typography className="approach-steps__title">
        {translate('screens.wreckers.approach-steps.title')}
      </Typography>
      <PinkStarImage className="approach-steps__pink-star" />
      <div className="approach-steps__card-container">{renderCards()}</div>
    </div>
  );
};

export default ApproachSteps;
