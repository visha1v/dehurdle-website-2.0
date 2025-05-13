import { AboutAppImage, AboutAppMobileImage, AppStoreImage, PlayStoreImage } from 'assets';
import { appConfig } from 'constant';
import { useViewport } from 'hooks';
import { translate } from 'locales';
import { onStoreClick } from 'utils';

import { IconButton, Typography } from '@mui/material';

import './joinDehurdle-styles.scss';

const JoinDehurdle = () => {
  const { isMobile, isTablet } = useViewport();
  const isDesktopImage = !isMobile && !isTablet;

  return (
    <div className="join-dehurdle__container">
      <div className="join-dehurdle__content">
        <Typography className="join-dehurdle__heading">
          {translate('screens.about-us.join-dehurdle.heading')}
        </Typography>
        <div className="join-dehurdle__store">
          <IconButton onClick={onStoreClick(appConfig.APP_STORE.playStore)}>
            <PlayStoreImage className="join-dehurdle__store-icon" />
          </IconButton>
          <IconButton onClick={onStoreClick(appConfig.APP_STORE.appleStore)}>
            <AppStoreImage className="join-dehurdle__store-icon" />
          </IconButton>
        </div>
      </div>
      <img
        src={isDesktopImage ? AboutAppImage : AboutAppMobileImage}
        alt="overview"
        className="join-dehurdle__image"
      />
    </div>
  );
};

export default JoinDehurdle;
