import { GrandMasterBackgroundImage, LeftYellowCloudImage, RightYellowCloudImage } from 'assets';
import { GRAND_MASTER_CARD_DATA } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import GrandMasterCard from './grand-master-card/GrandMasterCard';
import './grandmasters-styles.scss';

const Grandmasters = () => {
  const renderGrandMasterCard = () => {
    return GRAND_MASTER_CARD_DATA.map(item => {
      return <GrandMasterCard key={item.title} {...item} />;
    });
  };

  return (
    <div className="grandmasters__container">
      <div className="grandmasters__sub-container">
        <Typography className="grandmasters__description">
          {translate('screens.science.grandmasters.description-one')}
        </Typography>
      </div>
      <LeftYellowCloudImage className="grandmasters__left-cloud-image" />
      <RightYellowCloudImage className="grandmasters__right-cloud-image" />
      <div className="grandmasters__image-container">
        <div className="grandmasters__card-container">{renderGrandMasterCard()}</div>
        <img alt="Grand Master" className="grandmasters__image" src={GrandMasterBackgroundImage} />
      </div>
    </div>
  );
};

export default Grandmasters;
