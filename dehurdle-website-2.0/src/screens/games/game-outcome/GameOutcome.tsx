import React from 'react';

import { CustomButton } from 'components';
import { GameState } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import GameHeader from '../game-header/GameHeader';

import './game-outcome-styles.scss';

interface IGameOutcomeProps {
  feedback: string;
  gameName: string;
  outcome: string;
  setCurrentScreen: React.Dispatch<React.SetStateAction<GameState>>;
  title: string;
}

const GameOutcome = (props: IGameOutcomeProps) => {
  const { feedback, gameName, outcome, setCurrentScreen, title } = props;

  const handleButtonClick = () => {
    setCurrentScreen(GameState.Result);
  };

  return (
    <div className="game-outcome__container">
      <div>
        <GameHeader gameName={gameName} showCloseIcon={false} />
        <div className="game-outcome__sub-container">
          <Typography className="game-outcome__label">{title}</Typography>
          {!!outcome && (
            <div>
              <Typography className="game-outcome__title">
                {translate('screens.product-demo.game-outcome.title')}
              </Typography>
              <Typography className="game-outcome__sub-title">{outcome}</Typography>
            </div>
          )}
          {!!feedback && (
            <div>
              <Typography className="game-outcome__title">
                {translate('screens.product-demo.game-outcome.description')}
              </Typography>
              <Typography className="game-outcome__description">{feedback}</Typography>
            </div>
          )}
        </div>
      </div>
      <CustomButton
        buttonContainerClassName="game-outcome__button"
        label={translate('common.continue')}
        onClick={handleButtonClick}
      />
      {/* <FrogPointerImage className="game-outcome__image" /> */}
    </div>
  );
};

export default GameOutcome;
