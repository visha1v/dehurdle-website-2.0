import { ConquerWreckersImage } from 'assets';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './enterpriseSolution-styles.scss';

const EnterpriseSolution = () => {
  return (
    <div className="enterprise-solution__container">
      <img
        alt="enterprise-solution-image"
        className="enterprise-solution__image"
        src={ConquerWreckersImage}
      />
      <div>
        <Typography className="enterprise-solution__title">
          {translate('screens.enterprise.session.enterprise-solution.title')}
          <Typography className="enterprise-solution__title-highlighted" component={'span'}>
            {translate('screens.enterprise.session.enterprise-solution.title-highlight')}
          </Typography>
        </Typography>
        <Typography className="enterprise-solution__description">
          {translate('screens.enterprise.session.enterprise-solution.description')}
        </Typography>
      </div>
    </div>
  );
};

export default EnterpriseSolution;
