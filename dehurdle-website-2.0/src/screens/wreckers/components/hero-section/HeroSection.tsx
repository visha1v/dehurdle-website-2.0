import { useNavigate } from 'react-router-dom';

import { CustomButton } from 'components';
import { ROUTES } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './heroSection-styles.scss';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section__container">
      <div className="hero-section__sub-container">
        <Typography className="hero-section__title">
          {translate('screens.wreckers.hero-section.title')}
        </Typography>
        <Typography className="hero-section__description">
          {translate('screens.wreckers.hero-section.sub-title')}
        </Typography>
        <Typography className="hero-section__description">
          {translate('screens.wreckers.hero-section.description')}
        </Typography>
      </div>
      <div className="hero-section__button-container">
        <CustomButton
          buttonContainerClassName="hero-section__button"
          label={translate('screens.wreckers.hero-section.button.title')}
          onClick={() => {
            navigate(ROUTES.WRECKER_ASSESSMENT_INTRO);
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
