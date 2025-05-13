import { useContext } from 'react';

import { MASTERY_AUDIO_LINK, MASTERY_BREAKPOINTS, MEDITATION_AUDIO_LINK } from 'constant';
import { ActiveMediaContext } from 'context';
import { translate } from 'locales';
import { ActiveMediaPreset, ChallengesPreset } from 'types';
import { getBackgroundImage } from 'utils';

import AudioScreen from '../audio-screen/AudioScreen';
import ReflectionScreen from '../reflection-screen/ReflectionScreen';
import ShapeHuntScreen from '../shape-hunt-screen/ShapeHuntScreen';
import StoryGameScreen from '../story-game/StoryGame';

import './gameCard-styles.scss';

interface IGameCard {
  challengesPreset?: string;
  isImageLeft?: boolean;
  subTitle: string;
  title: string;
}

const GameCard = (props: IGameCard) => {
  const { activeMedia } = useContext(ActiveMediaContext) || {};
  const { challengesPreset = '', isImageLeft = false, subTitle, title } = props;

  const backgroundImage = getBackgroundImage(challengesPreset);

  const renderChallenge = () => {
    let challenge = (
      <AudioScreen
        audioBreakpoints={MASTERY_BREAKPOINTS}
        audioUrl={MASTERY_AUDIO_LINK}
        instanceId={challengesPreset}
        isPlaying={activeMedia === ActiveMediaPreset.MasteryAudio}
        title={translate('screens.product-demo.challenges.mastery.title')}
      />
    );
    switch (challengesPreset) {
      case ChallengesPreset.Mastery:
        challenge = (
          <AudioScreen
            audioBreakpoints={MASTERY_BREAKPOINTS}
            audioUrl={MASTERY_AUDIO_LINK}
            instanceId={ChallengesPreset.Mastery}
            isPlaying={activeMedia === ActiveMediaPreset.MasteryAudio}
            title={translate('screens.product-demo.challenges.mastery.title')}
          />
        );
        break;
      case ChallengesPreset.Meditation:
        challenge = (
          <AudioScreen
            audioUrl={MEDITATION_AUDIO_LINK}
            instanceId={ChallengesPreset.Meditation}
            isMeditation
            isPlaying={activeMedia === ActiveMediaPreset.MeditationAudio}
            title={translate('screens.product-demo.challenges.meditation.title')}
          />
        );
        break;
      case ChallengesPreset.Reflection:
        challenge = <ReflectionScreen />;
        break;

      case ChallengesPreset.ShapeHunt:
        challenge = <ShapeHuntScreen />;
        break;

      case ChallengesPreset.SpinAStory:
        challenge = <StoryGameScreen />;
        break;
    }
    return challenge;
  };

  const renderImage = () => {
    return (
      <div
        className="game-card__game-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="game-card__phone-frame">
          <div className="game-card__game">{renderChallenge()}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="game-card__container">
      {isImageLeft && renderImage()}
      <div className="game-card__sub-container">
        <div className="game-card__title">{title}</div>
        <div className="game-card__sub-title">{subTitle}</div>
      </div>
      {!isImageLeft && renderImage()}
    </div>
  );
};

export default GameCard;
