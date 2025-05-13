import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CelebrateLottie } from 'assets';
import { CustomButton, CustomLottie } from 'components';
import { LOTTIE_DEFAULT_STYLE, ROUTES, TitleContainer } from 'constant';
import { ScreenWrapper } from 'hoc';
import { translate } from 'locales';
import { getLottieDimensions } from 'utils';

import { Typography } from '@mui/material';

import './accountCreated-styles.scss';

const AccountCreated = () => {
  const navigate = useNavigate();

  const [lottieDimension, setLottieDimension] = useState(LOTTIE_DEFAULT_STYLE);

  const onContinueClick = () => {
    navigate(ROUTES.WRECKER_ASSESSMENT);
  };

  const getTitleContainer = (position: string) => (
    <div className={`account-created__${position}-container`}>
      <Typography className="account-created__title">
        {translate('screens.account-created.title')}
      </Typography>
      <Typography className="account-created__sub-title">
        {translate('screens.account-created.sub-title')}
      </Typography>
    </div>
  );

  useEffect(() => {
    const innerWidth = window.innerWidth;
    setLottieDimension(getLottieDimensions(innerWidth));
  }, []);

  return (
    <ScreenWrapper>
      <div className="account-created__container">
        {getTitleContainer(TitleContainer.Header)}
        <CustomLottie lottieSource={CelebrateLottie} style={lottieDimension} />
        {getTitleContainer(TitleContainer.Footer)}
        <CustomButton
          label={translate('screens.account-created.button-label')}
          onClick={onContinueClick}
        />
      </div>
    </ScreenWrapper>
  );
};

export default AccountCreated;
