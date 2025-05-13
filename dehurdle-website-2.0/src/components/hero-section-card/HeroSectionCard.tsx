import React from 'react';

import { Typography } from '@mui/material';

import './heroSectionCard-styles.scss';

interface IHeroSectionProps {
  className?: string;
  description: string;
  disclaimer?: string;
  image: React.ElementType;
  imageClassName?: string;
  imageContainerClassName?: string;
  title: string;
  titleClassName?: string;
}

const HeroSectionCard = (props: IHeroSectionProps) => {
  const {
    className,
    description,
    disclaimer,
    image: Image,
    imageClassName = '',
    imageContainerClassName = '',
    title,
    titleClassName = '',
  } = props;

  return (
    <div className={`hero-section-card__container hero-section-card__container__${className}`}>
      <div
        className={`hero-section-card__sub-container hero-section-card__sub-container__${className}`}>
        <div
          className={`hero-section-card__image-container hero-section-card__${imageContainerClassName}`}>
          <Image className={`hero-section-card__image ${imageClassName}`} />
        </div>
        <div className="hero-section-card__main-container">
          {!!disclaimer && (
            <Typography className="hero-section-card__disclaimer">{disclaimer}</Typography>
          )}
          <Typography className={`hero-section-card__title hero-section-card__${titleClassName}`}>
            {title}
          </Typography>
          <Typography className="hero-section-card__description">{description}</Typography>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionCard;
