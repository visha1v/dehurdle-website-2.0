import { useContext, useState } from 'react';

import { CustomButton } from 'components';
import { GameState, GameType, ResultStatus } from 'constant';
import { ActiveMediaContext } from 'context';
import { translate } from 'locales';
import {
  ActiveMediaPreset,
  IGameType,
  IShapeSpotterResponseJsonItem,
  IStoryGameResponseJsonItem,
} from 'types';

import { Typography } from '@mui/material';

import GameHeader from '../game-header/GameHeader';
import GameOutcome from '../game-outcome/GameOutcome';
import GameResult from '../game-result/GameResult';
import ShapeSpotter from '../shape-spotter/ShapeSpotter';
import StoryGame from '../story-game/StoryGame';

import './game-intro-styles.scss';

interface IGameIntroProps {
  activeMediaPreset: ActiveMediaPreset;
  data: IGameType;
}

const GameIntro = (props: IGameIntroProps) => {
  const { data, activeMediaPreset } = props;

  const { setActiveMedia } = useContext(ActiveMediaContext) || {};

  const { basePoints, gameName, gameSubType, responseJson, rules } = data;
  const { title } = responseJson as IStoryGameResponseJsonItem;

  const [currentScreen, setCurrentScreen] = useState(GameState.Intro);
  const [gameResult, setGameResult] = useState(ResultStatus.Win);
  const [outcome, setOutcome] = useState('');
  const [feedback, setFeedback] = useState('');

  const renderGameIntroData = () => {
    return rules.map((item: string) => (
      <ul key={item} className="game-intro__rule-list">
        <li className="game-intro__rule-item">{item}</li>
      </ul>
    ));
  };

  const handleStartGame = () => {
    setActiveMedia && setActiveMedia(activeMediaPreset);
    setCurrentScreen(GameState.Playing);
  };

  return (
    <>
      {currentScreen === GameState.Intro && (
        <div className="game-intro__container">
          <div>
            <GameHeader gameName={gameName} />
            <div className="game-intro__sub-container">
              <Typography className="game-intro__label">
                {translate('screens.product-demo.game-intro.title')}
              </Typography>
              {renderGameIntroData()}
            </div>
          </div>
          <CustomButton
            buttonContainerClassName="game-intro__button"
            label={'Start Game'}
            onClick={handleStartGame}
          />
          {/* <FrogPointerImage className="game-intro__image" /> */}
        </div>
      )}
      {currentScreen === GameState.Playing && gameSubType === GameType.SHAPE_SPOTTING && (
        <ShapeSpotter
          gameName={gameName}
          responseJson={responseJson as IShapeSpotterResponseJsonItem}
          setCurrentScreen={setCurrentScreen}
          setGameResult={setGameResult}
        />
      )}
      {currentScreen === GameState.Playing && gameSubType === GameType.STORY_TELLING && (
        <StoryGame
          gameName={gameName}
          responseJson={responseJson as IStoryGameResponseJsonItem}
          setCurrentScreen={setCurrentScreen}
          setFeedback={setFeedback}
          setOutcome={setOutcome}
        />
      )}
      {currentScreen === GameState.Outcome && gameSubType === GameType.STORY_TELLING && (
        <GameOutcome
          feedback={feedback}
          gameName={gameName}
          outcome={outcome}
          setCurrentScreen={setCurrentScreen}
          title={title}
        />
      )}
      {currentScreen === GameState.Result && (
        <GameResult
          basePoints={basePoints}
          result={gameResult}
          screenName={gameName}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </>
  );
};

export default GameIntro;
