import { useState } from 'react';
import { Trans } from 'react-i18next';

import { CustomButton } from 'components';
import { DAILY_CHALLENGES_DATA } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './dailyChallenges-styles.scss';

const DailyChallenges = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderMobileContent = () => (
    <div className="daily-challenges__mobile-body">
      {DAILY_CHALLENGES_DATA.map((card, index) => (
        <div key={`${card.buttonTitle}-${index}`} className="daily-challenges__mobile-body-content">
          <img src={card.image} alt={card.buttonTitle} className="daily-challenges__mobile-image" />
          <div className="daily-challenges__mobile-body-content-container">
            <Typography className="daily-challenges__mobile-content-heading">
              {card.buttonTitle}
            </Typography>
            <Typography className="daily-challenges__mobile-content-description">
              <Trans i18nKey={card.description} />
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDesktopContent = () => (
    <div className="daily-challenges__desktop-body">
      <div className="daily-challenges__button-content-container">
        <div className="daily-challenges__dot-container">
          {DAILY_CHALLENGES_DATA.map((_, index) => (
            <div
              key={`${_.image}-${index}`}
              className={
                index === activeIndex
                  ? 'daily-challenges__button-active-dot'
                  : 'daily-challenges__button-dot'
              }
            />
          ))}
        </div>
        <div className="daily-challenges__button-container">
          {DAILY_CHALLENGES_DATA.map((card, index) => (
            <CustomButton
              key={`${card.buttonTitle}-${index}`}
              onClick={() => setActiveIndex(index)}
              label={card.buttonTitle}
              buttonContainerClassName={
                activeIndex === index
                  ? 'daily-challenges__button-active'
                  : 'daily-challenges__button'
              }
              buttonTextClassName="daily-challenges__button-text"
            />
          ))}
        </div>
      </div>
      <div className="daily-challenges__body-content-container">
        {DAILY_CHALLENGES_DATA.map(
          (card, index) =>
            activeIndex === index && (
              <div
                key={`${card.buttonTitle}-${index}`}
                className={`daily-challenges__body-content-active ${
                  activeIndex === index ? 'daily-challenges__fade-in' : 'daily-challenges__fade-out'
                }`}>
                <img src={card.image} alt={card.buttonTitle} className="daily-challenges__image" />
                <Typography className="daily-challenges__body-content">
                  <Trans i18nKey={card.description} />
                </Typography>
              </div>
            ),
        )}
      </div>
    </div>
  );

  return (
    <div className="daily-challenges__container">
      <div className="daily-challenges__header-container">
        <Typography className="daily-challenges__heading">
          {translate('screens.science.daily-challenges.heading')}
        </Typography>
        <Typography className="daily-challenges__header-content">
          {translate('screens.science.daily-challenges.sub-heading')}
        </Typography>
      </div>
      {renderDesktopContent()}
      {renderMobileContent()}
    </div>
  );
};

export default DailyChallenges;
