import React from 'react';

import { Typography } from '@mui/material';

import './grandMasterCard-styles.scss';

interface IGrandMasterCardProps {
  image: React.ElementType;
  imageAlignment: string;
  title: string;
}

const GrandMasterCard = (props: IGrandMasterCardProps) => {
  const { image: Image, imageAlignment, title } = props;

  return (
    <div
      className={`grandMasterCard__container grandMasterCard__${imageAlignment !== 'center' && 'side-container'} grandMasterCard__${imageAlignment}-container`}>
      <div className="grandMaster__icon-container">
        <Image className={`grandMasterCard__${imageAlignment}-image`} />
      </div>
      <Typography className="grandMasterCard__title">{title}</Typography>
    </div>
  );
};

export default GrandMasterCard;
