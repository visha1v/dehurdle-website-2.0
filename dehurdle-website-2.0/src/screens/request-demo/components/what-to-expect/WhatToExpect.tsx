import { WHAT_TO_EXPECT_CARD_DATA } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './whatToExpect-styles.scss';

const WhatToExpect = () => {
  const renderWhatToExpectCards = () =>
    WHAT_TO_EXPECT_CARD_DATA.map(card => {
      const { description, title } = card;

      return (
        <div className="what-to-expect__cards-sub-container" key={title}>
          <div className="what-to-expect__card" key={title}>
            <Typography className="what-to-expect__card-title">{title}</Typography>
            <Typography className="what-to-expect__card-description">{description}</Typography>
          </div>
        </div>
      );
    });

  return (
    <div className="what-to-expect__container">
      <Typography className="what-to-expect__title">
        {translate('screens.demo.what-to-expect.title')}
      </Typography>
      <div className="what-to-expect__cards-container">{renderWhatToExpectCards()}</div>
      {/* <Typography className="what-to-expect__form-text">
        {translate('screens.demo.fill-form')}
      </Typography> */}
    </div>
  );
};

export default WhatToExpect;
