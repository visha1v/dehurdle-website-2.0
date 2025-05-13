import React from 'react';

import { useViewport } from 'hooks';
import palette from 'theme/colors';

import { Typography } from '@mui/material';

import './overviewCard-styles.scss';

interface IOverviewCardProps {
  className: string;
  description: string;
  icon: React.JSX.ElementType;
  title: string;
}

const OverviewCard = (props: IOverviewCardProps) => {
  const { className, description, icon: Icon, title } = props;

  const { isTabPortrait } = useViewport();

  return (
    <div className={`overview-card__container ${isTabPortrait ? '' : className} `}>
      <div className="overview-card__sub-container">
        <Typography className="overview-card__title">{title}</Typography>
        <Typography className="overview-card__description">{description}</Typography>
      </div>
      <Icon className={`overview-card__image`} color={palette.carouselPink} />
    </div>
  );
};

export default OverviewCard;
