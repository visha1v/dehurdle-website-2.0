import { MentalFitnessScoreImage, QuizImage } from 'assets';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './dehurdleAssessment-styles.scss';

const DehurdleAssessment = () => {
  return (
    <div className="dehurdle-assessment__container">
      <Typography className="dehurdle-assessment__title">
        {translate('screens.science.dehurdle-assessment.title')}
      </Typography>
      {/* <Typography className="dehurdle-assessment__sub-title">
        {translate('screens.science.dehurdle-assessment.sub-title')}
      </Typography> */}
      <div className="dehurdle-assessment__item-container">
        <img
          src={QuizImage}
          alt="dehurdle-assessment"
          className="dehurdle-assessment__image"
          loading="lazy"
        />
        <div className="dehurdle-assessment__content">
          <Typography className="dehurdle-assessment__content-title">
            {translate('screens.science.dehurdle-assessment.quiz.title')}
          </Typography>
          <Typography className="dehurdle-assessment__description">
            {translate('screens.science.dehurdle-assessment.quiz.description')}
          </Typography>
        </div>
      </div>
      <div className="dehurdle-assessment__item-container dehurdle-assessment__item-container-reverse">
        <div>
          <Typography className="dehurdle-assessment__description">
            {translate('screens.science.dehurdle-assessment.mental-fitness-score.description1')}
          </Typography>
          <Typography className="dehurdle-assessment__description">
            {translate('screens.science.dehurdle-assessment.mental-fitness-score.description2')}
          </Typography>
        </div>
        <img
          src={MentalFitnessScoreImage}
          alt="MentalFitnessScoreImage"
          className="dehurdle-assessment__image"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default DehurdleAssessment;
