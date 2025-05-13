import React from 'react';

import { IHomeCardPreset } from 'constant';
import { ICard, IPrimaryCard } from 'types';

import { Typography } from '@mui/material';

import './card-styles.scss';

const Card = (props: ICard) => {
  const { color, number, preset, numberColor, image, className = '' } = props;

  // Render with text
  const renderWithText = () => {
    const { title, description } = props as IPrimaryCard;
    return (
      <>
        <Typography className="card__title" variant="h6">
          {title}
        </Typography>
        <Typography className="card__description" variant="body2">
          {description}
        </Typography>
      </>
    );
  };

  // Render Preset Content
  const renderPresetContent = () => {
    return preset === IHomeCardPreset.Primary ? renderWithText() : null;
  };

  return (
    <div className={`card__container ${className}`} style={{ backgroundColor: color }}>
      <Typography
        className="card__header"
        sx={{
          color: numberColor,
        }}>
        {number}
      </Typography>
      <img src={image} alt={`${number} ${preset} card`} className="card__image" loading="lazy" />
      {renderPresetContent()}
    </div>
  );
};

export default React.memo(Card);
