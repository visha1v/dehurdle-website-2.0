import { useNavigate } from 'react-router-dom';

import { CelebrationImage } from 'assets';
import { CustomAppWrapper, CustomButton } from 'components';
import { CustomAppWrapperPreset, ROUTES } from 'constant';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import palette from 'theme/colors';

import { Typography } from '@mui/material';

import './thankYou-styles.scss';

const ThankYou = () => {
  const { domainStore } = useStore();
  const { logoutUser } = domainStore;

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    await logoutUser();
    navigate(ROUTES.HOME);
  };

  return (
    <CustomAppWrapper preset={CustomAppWrapperPreset.Quiz} isQuizFlow>
      <div className="thank-you__container">
        <div className="thank-you__lottie-container">
          <CelebrationImage color={palette.distantHorizon} />
        </div>
        <div className="thank-you__sub-container">
          <Typography className="thank-you__title">
            {translate('screens.wrecker-assessment.thank-you.title')}
          </Typography>
          <Typography className="thank-you__subtitle">
            {translate('screens.wrecker-assessment.thank-you.subtitle')}
          </Typography>
        </div>
        <CustomButton
          buttonContainerClassName="thank-you__button"
          buttonTextClassName="thank-you__button-title"
          label={translate('common.continue')}
          onClick={handleButtonClick}
        />
      </div>
    </CustomAppWrapper>
  );
};

export default observer(ThankYou);
