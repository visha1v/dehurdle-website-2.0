import { useNavigate } from 'react-router-dom';

import { BoxingImage } from 'assets';
import { CustomButton, LottieSection } from 'components';
import { ROUTES } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './takeAssessment-styles.scss';

const TakeAssessment = () => {
  const navigate = useNavigate();

  return (
    <div className="take-assessment__container">
      <div className="take-assessment__lottie-container">
        <LottieSection />
      </div>
      <div className="take-assessment__card-section">
        <BoxingImage className="take-assessment__image" />
        <Typography className="take-assessment__title">
          {translate('screens.about-us.take-assessment.title')}
        </Typography>
        <Typography className="take-assessment__description">
          {translate('screens.about-us.take-assessment.description')}
        </Typography>
        <CustomButton
          buttonContainerClassName="take-assessment__button"
          label={translate('screens.about-us.take-assessment.button-title')}
          onClick={() => {
            navigate(ROUTES.WRECKER_ASSESSMENT_INTRO);
          }}
        />
      </div>
    </div>
  );
};

export default TakeAssessment;
