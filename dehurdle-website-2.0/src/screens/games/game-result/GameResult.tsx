import { CelebrationImage, GameFailureImage, RewardIcon } from 'assets';
import { CustomButton } from 'components';
import {
  ActivityType,
  AudioScreenPreset,
  EXPERIENCE_POINTS,
  GameState,
  ResultStatus,
} from 'constant';
import { translate } from 'locales';
import palette from 'theme/colors';

import { Typography } from '@mui/material';

import GameHeader from '../game-header/GameHeader';

import './game-result-styles.scss';
import RatingCard from './rating-card/RatingCard';

interface IGameResultProps {
  activityType?: ActivityType;
  basePoints: number;
  result: ResultStatus;
  screenName: string;
  setCurrentScreen?: (value: GameState) => void;
  setCurrentAudioScreen?: (value: AudioScreenPreset) => void;
}

const GameResult = (props: IGameResultProps) => {
  const {
    activityType = ActivityType.Game,
    basePoints,
    result,
    screenName,
    setCurrentScreen,
    setCurrentAudioScreen,
  } = props;

  const isGameSuccessful = result === ResultStatus.Win;
  const primaryButtonLabel = isGameSuccessful
    ? translate('common.replay')
    : translate('common.try-again');
  const GameStatusImage = isGameSuccessful ? CelebrationImage : GameFailureImage;
  const iconColor = isGameSuccessful ? palette.distantHorizon : palette.iceWhite;
  const GameTitle = isGameSuccessful
    ? translate('screens.product-demo.result.game.success')
    : translate('screens.product-demo.result.game.failure');
  const title =
    activityType === ActivityType.Audio
      ? translate('screens.product-demo.result.activity.success')
      : GameTitle;

  const onPrimaryButtonClick = () => {
    if (activityType === ActivityType.Game) {
      if (isGameSuccessful) {
        setCurrentScreen && setCurrentScreen(GameState.Intro);
      } else {
        setCurrentScreen && setCurrentScreen(GameState.Playing);
      }
    } else if (activityType === ActivityType.Audio) {
      setCurrentAudioScreen && setCurrentAudioScreen(AudioScreenPreset.Intro);
    }
  };

  const onSecondaryButtonClick = () => {
    setCurrentScreen && setCurrentScreen(GameState.Intro);
  };

  return (
    <div className="game-result__container">
      <GameHeader gameName={screenName} showCloseIcon={false} />
      <div className="game-result__sub-container">
        <div className="game-result__content-container">
          <Typography className="game-result__title">{title}</Typography>
          {isGameSuccessful && (
            <div className="game-result__main-container">
              <RewardIcon />
              <Typography className="game-result__sub-title">{`${basePoints} ${EXPERIENCE_POINTS}`}</Typography>
            </div>
          )}
        </div>
        <GameStatusImage className="game-result__image" color={iconColor} />
        <div className="game-result__button-container">
          {isGameSuccessful && <RatingCard />}
          <div className="game-result__button-sub-container">
            {!isGameSuccessful && (
              <CustomButton
                buttonContainerClassName="game-result__secondary-button"
                buttonTextClassName="game-result__secondary-button-text"
                label={translate('screens.product-demo.result.game.button-title')}
                onClick={onSecondaryButtonClick}
              />
            )}
            <CustomButton
              buttonContainerClassName="game-result__button"
              label={primaryButtonLabel}
              onClick={onPrimaryButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
