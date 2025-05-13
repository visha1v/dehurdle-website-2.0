import React from 'react';

import { DifferenceCardType } from 'constant';

import { Typography } from '@mui/material';

import './differenceCard-styles.scss';

interface IDifferenceCardProps {
  backgroundColor: string;
  description?: string;
  icon?: React.JSX.ElementType;
  title: string;
  titleColor: string;
  type: DifferenceCardType;
}

const Section4Card = (props: IDifferenceCardProps) => {
  const { backgroundColor, description, icon: Icon, title, titleColor, type } = props;

  const isCardType = type === DifferenceCardType.Card;

  return (
    <div
      className={
        isCardType ? 'difference-card__card-container' : 'difference-card__default-container'
      }
      style={{ backgroundColor }}>
      {Icon && <Icon className="difference-card__icon" />}
      <Typography
        className={isCardType ? 'difference-card__card-title' : 'difference-card__default-title'}
        style={{ color: titleColor }}>
        {title}
      </Typography>
      {description && (
        <Typography className="difference-card__description">{description}</Typography>
      )}
    </div>
  );
};

export default Section4Card;
