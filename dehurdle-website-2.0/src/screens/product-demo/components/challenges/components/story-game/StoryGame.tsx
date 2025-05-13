import { PhoneStatusBarImage } from 'assets';
import { STORY_GAME_DATA } from 'constant';
import GameIntro from 'screens/games/game-intro/GameIntro';
import { ActiveMediaPreset } from 'types';

import './story-game-styles.scss';

const StoryGameScreen = () => {
  return (
    <div className="story-game-screen__container">
      <img src={PhoneStatusBarImage} alt="status bar" className="audio-screen__status-bar" />
      <GameIntro activeMediaPreset={ActiveMediaPreset.SpinAStory} data={STORY_GAME_DATA} />
    </div>
  );
};

export default StoryGameScreen;
