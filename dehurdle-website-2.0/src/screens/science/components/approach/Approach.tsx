import { ScienceApproachMobileImage } from 'assets';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './approach-styles.scss';

const Approach = () => {
  return (
    <div className="approach__container">
      <div className="approach__content">
        <Typography className="approach__title">
          {translate('screens.science.approach.title')}
        </Typography>
        <Typography className="approach__description">
          {translate('screens.science.approach.description')}
        </Typography>
      </div>
      <img src={ScienceApproachMobileImage} alt="Science Approach" className="approach__image" />
    </div>
  );
};

export default Approach;
