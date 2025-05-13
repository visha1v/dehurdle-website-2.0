import { useMemo } from 'react';

import { CustomMarquee } from 'components';
import { CarouselDirection, LOGOS } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './organisations-styles.scss';

const Organisations = () => {
  const renderCarouselSlides = useMemo(
    () => (
      <div className="organisations__carousel">
        {LOGOS.map((Logo, index) => (
          <Logo key={`${Logo}-${index}`} className="organisations__logo" />
        ))}
      </div>
    ),
    [],
  );

  return (
    <div className="organisations__container">
      <Typography className="organisations__title">
        {translate('screens.enterprise.session.organisations.heading')}
      </Typography>
      <CustomMarquee direction={CarouselDirection.Left}>{renderCarouselSlides}</CustomMarquee>
    </div>
  );
};

export default Organisations;
