import { CLARITY_COACHING_CARD_DATA } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './clarityCoaching-styles.scss';

const ClarityCoaching = () => {
  const renderCoachingCards = () =>
    CLARITY_COACHING_CARD_DATA.map(card => {
      const { title, backgroundColor } = card;

      return (
        <div key={title} style={{ backgroundColor }} className="clarity-coaching__card">
          <Typography className="clarity-coaching__card-title">{title}</Typography>
        </div>
      );
    });

  return (
    <div className="clarity-coaching__container">
      <div>
        <Typography className="clarity-coaching__title">
          {translate('screens.enterprise.session.clarity-coaching.title')}
        </Typography>
        <Typography className="clarity-coaching__description">
          {translate('screens.enterprise.session.clarity-coaching.description')}
        </Typography>
      </div>
      <div className="clarity-coaching__cards-container">{renderCoachingCards()}</div>
      <div className="clarity-coaching__footer-container">
        <Typography className="clarity-coaching__footer-text">
          <span>{translate('screens.enterprise.session.clarity-coaching.footer.title')}</span>
          {translate('screens.enterprise.session.clarity-coaching.footer.sub-title')}
        </Typography>
      </div>
    </div>
  );
};

export default ClarityCoaching;
