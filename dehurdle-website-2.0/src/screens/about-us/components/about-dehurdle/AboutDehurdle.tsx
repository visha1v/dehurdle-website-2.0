import { ForestAmicoImage } from 'assets';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './aboutDehurdle-styles.scss';

const AboutDehurdle = () => {
  return (
    <div className="about-dehurdle__container">
      <img src={ForestAmicoImage} alt="Forest Amico" className="about-dehurdle__image" />
      <div className="about-dehurdle__content-container">
        <Typography className="about-dehurdle__title">
          {translate('screens.about-us.about-dehurdle.title')}
        </Typography>
        <Typography className="about-dehurdle__description">
          {translate('screens.about-us.about-dehurdle.description')}
        </Typography>
      </div>
    </div>
  );
};

export default AboutDehurdle;
