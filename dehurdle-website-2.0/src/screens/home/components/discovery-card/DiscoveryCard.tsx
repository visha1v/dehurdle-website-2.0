import { useNavigate } from 'react-router-dom';

import { CustomButton, LottieSection } from 'components';
import { ROUTES } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './discoveryCard-styles.scss';

const DiscoveryCard = () => {
  const navigate = useNavigate();

  const onDiscoverWreckerClick = () => {
    navigate(ROUTES.WRECKER_ASSESSMENT_INTRO);
  };

  return (
    <div className="discovery-card__container">
      <div className="discovery-card__lottie-container">
        <LottieSection />
      </div>
      <div className="discovery-card__card-section">
        <Typography className="discovery-card__title">
          {translate('screens.home.discovery-card.title')}
        </Typography>
        <Typography className="discovery-card__description">
          {translate('screens.home.discovery-card.description')}
        </Typography>
        <div className="discovery-card__lottie-container-mobile">
          <LottieSection />
        </div>
        <div className="discovery-card__button-container">
          <Typography className="discovery-card__desclaimer">
            {translate('screens.home.discovery-card.desclaimer')}
          </Typography>
          <CustomButton
            buttonContainerClassName="discovery-card__button"
            isCapitalize
            label={translate('screens.home.discovery-card.button-title')}
            onClick={onDiscoverWreckerClick}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoveryCard;
