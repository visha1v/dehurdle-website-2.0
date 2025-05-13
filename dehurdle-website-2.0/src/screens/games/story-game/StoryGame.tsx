import React, { useRef, useState } from 'react';

import { CustomButton } from 'components';
import { GameState, GameType } from 'constant';
import { translate } from 'locales';
import palette from 'theme/colors';
import { IStoryGameResponseJsonItem } from 'types';

import { Typography } from '@mui/material';

import GameHeader from '../game-header/GameHeader';

import './story-game-styles.scss';

interface IStoryGameProps {
  gameName: string;
  responseJson: IStoryGameResponseJsonItem;
  setCurrentScreen: React.Dispatch<React.SetStateAction<GameState>>;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  setOutcome: React.Dispatch<React.SetStateAction<string>>;
}

const StoryGame = (props: IStoryGameProps) => {
  const { gameName, responseJson, setCurrentScreen, setFeedback, setOutcome } = props;

  const { decisionPoints, story, title } = responseJson;

  const [currentDecisionId, setCurrentDecisionId] = useState<string>(decisionPoints[0].id);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const decisionPoint = useRef(1);

  const currentDecisionPoint = decisionPoints.find(item => item.id === currentDecisionId);
  const subtitle = `${translate('screens.product-demo.challenges.spin-a-story.decision')} ${decisionPoint.current}`;

  const handleOptionPress = (id: string) => () => {
    const selectedOption = currentDecisionPoint?.options.find(option => option.id === id);
    if (selectedOption) {
      setSelectedOptionId(id);
    }
  };

  const handleContinuePress = () => {
    const lastSelectedOption = currentDecisionPoint?.options.find(
      option => option.id === selectedOptionId,
    );
    if (lastSelectedOption?.nextDecisionId) {
      setCurrentDecisionId(lastSelectedOption.nextDecisionId);
      decisionPoint.current += 1;
      setSelectedOptionId(null);
    } else {
      const { suggestedFeedback, outcome } = lastSelectedOption || {};
      setOutcome(outcome!);
      setFeedback(suggestedFeedback!);
      setCurrentScreen(GameState.Outcome);
    }
  };

  const handleCloseClick = () => {
    setCurrentScreen(GameState.Intro);
  };

  const renderOptions = () => {
    return currentDecisionPoint?.options.map(option => {
      const { id, label } = option;
      const isSelected = selectedOptionId === id;
      const activeContainerStyle = isSelected
        ? {
            borderColor: palette.bianchiGreen,
            backgroundColor: palette.iceWhite,
          }
        : {};
      const activeTitleStyle = isSelected
        ? {
            color: palette.greenCyan,
          }
        : {};

      return (
        <div
          className="story-game__option-container"
          key={id}
          onClick={handleOptionPress(id)}
          style={activeContainerStyle}>
          <Typography className="story-game__option-title" style={activeTitleStyle}>
            {label}
          </Typography>
        </div>
      );
    });
  };

  return (
    <div className="story-game__container">
      <div className="story-game__header-container">
        <GameHeader
          gameName={gameName}
          gameType={GameType.STORY_TELLING}
          onClick={handleCloseClick}
        />
      </div>
      <div className="story-game__story-container">
        <Typography className="story-game__title">{title}</Typography>
        <Typography className="story-game__story">{story}</Typography>
      </div>
      <div>
        <div className="story-game__main-container">
          <Typography className="story-game__sub-title">{subtitle}</Typography>
          <div className="story-game__content-container">{renderOptions()}</div>
          <CustomButton
            buttonContainerClassName="story-game__button"
            disabled={!selectedOptionId}
            label={translate('common.next')}
            onClick={handleContinuePress}
          />
        </div>
        {decisionPoint.current > 1 ? (
          <div className={`story-game__stacked-card story-game__stacked-card-one`} />
        ) : (
          <div className="story-game__stacked-card" />
        )}
        {decisionPoint.current > 2 ? (
          <div className={`story-game__stacked-card story-game__stacked-card-two`} />
        ) : (
          <div className="story-game__stacked-card" />
        )}
      </div>
    </div>
  );
};

export default StoryGame;
