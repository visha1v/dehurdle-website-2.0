import React from 'react';

import { ImageAlignment } from 'constant';
import colors from 'theme/colors';

import { Typography } from '@mui/material';

import './approachStepCard-styles.scss';

interface IApproachStepCardProps {
  description: string;
  description2: string;
  icon: React.JSX.ElementType;
  id: number;
  imageAlignment: ImageAlignment;
  title: string;
}

const ApproachStepCard = (props: IApproachStepCardProps) => {
  const { description, description2, icon: Icon, id, imageAlignment, title } = props;

  return (
    <div
      className={`approach-step-card__container ${
        imageAlignment === ImageAlignment.Right ? 'row-reverse' : ''
      }`}>
      <Icon color={colors.carouselPink} className="approach-step-card__icon" />
      <div className="approach-step-card__title-container">
        <div className="approach-step-card__title-sub-container">
          <Typography className="approach-step-card__title">{`${id}.`}</Typography>
          <Typography className="approach-step-card__title">{title}</Typography>
        </div>
        <Typography className="approach-step-card__description">{description}</Typography>
        <Typography className="approach-step-card__description">{description2}</Typography>
      </div>
    </div>
  );
};

export default ApproachStepCard;
