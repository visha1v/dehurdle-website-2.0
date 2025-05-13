import { useState } from 'react';

import { CustomDialog, CustomLottie } from 'components';
import { getWreckersSource } from 'utils';

import { Typography } from '@mui/material';

import './wreckerCard-styles.scss';

interface IWreckerCardProps {
  description: string;
  isFirstItem?: boolean;
  isLastItem?: boolean;
  name: string;
  score: number;
}

const WreckerCard = (props: IWreckerCardProps) => {
  const { isFirstItem = false, isLastItem = false, name, score, description } = props;
  const { imageSource: Icon, lottieSource } = getWreckersSource(name);

  const [openDialog, setOpenDialog] = useState(false);

  const onClose = () => {
    setOpenDialog(false);
  };

  const onCardClick = () => {
    setOpenDialog(true);
  };

  const renderProgressBar = () => {
    return (
      <div className="wrecker-card__right-container">
        <Typography className="wrecker-card__right-container-title">{score}%</Typography>
        <div className="wrecker-card__progress-bar">
          <div className="wrecker-card__progress-bar-indicator" style={{ width: `${score}%` }} />
        </div>
      </div>
    );
  };

  const renderDialog = () => {
    return (
      <div className="wrecker-card__dialog">
        <CustomLottie lottieSource={lottieSource} />
        <Typography className="wrecker-card__dialog-title">{name}</Typography>
        <Typography className="wrecker-card__dialog-sub-title">{description}</Typography>
        {renderProgressBar()}
      </div>
    );
  };

  return (
    <>
      <div
        className={`wrecker-card ${isFirstItem ? 'wrecker-card__first-item' : ''} ${isLastItem ? 'wrecker-card__last-item' : ''}`}
        onClick={onCardClick}>
        <div className={'wrecker-card__left-container'}>
          <div className={`${isFirstItem ? 'wrecker-card__left-icon-container' : ''}`}>
            <Icon />
          </div>
          <Typography className="wrecker-card__left-container-title">{name}</Typography>
        </div>
        {renderProgressBar()}
      </div>
      <CustomDialog open={openDialog} onClose={onClose}>
        {renderDialog()}
      </CustomDialog>
    </>
  );
};

export default WreckerCard;
