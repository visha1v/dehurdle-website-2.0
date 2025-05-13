import { CustomButton } from 'components';
import { FOUNDER_CARD_DATA, FOUNDER_WEBSITE_LINK } from 'constant';
import { translate } from 'locales';
import { IFounderCard } from 'types';

import { Typography } from '@mui/material';

import './dehurdleFounder-styles.scss';

const DehurdleFounder = () => {
  const handleLearnMoreClick = () => {
    window.open(FOUNDER_WEBSITE_LINK, '_blank');
  };

  const renderCard = (data: IFounderCard) => {
    const { className, description, image, key, title } = data;

    return (
      <div key={key} className={`${className}`}>
        <div className="dehurdle-founder__text-container">
          <Typography className="dehurdle-founder__title">{title}</Typography>
          <Typography className="dehurdle-founder__description">{description}</Typography>
          <CustomButton
            buttonContainerClassName="dehurdle-founder__button"
            label={translate('screens.about-us.dehurdle-founder.founder-one.learn-more')}
            onClick={handleLearnMoreClick}
          />
        </div>
        <img
          src={image}
          alt="dehurdle-founder"
          className={`dehurdle-founder__image`}
          loading="lazy"
        />
      </div>
    );
  };
  return (
    <div className="dehurdle-founder__container">
      <Typography className="dehurdle-founder__section-title">
        {translate('screens.about-us.dehurdle-founder.title')}
      </Typography>
      <div className="dehurdle-founder__card-container">
        {FOUNDER_CARD_DATA.map(item => renderCard(item))}
      </div>
    </div>
  );
};

export default DehurdleFounder;
