import { PhoneStatusBarImage } from 'assets';
import { SHAPE_SPOTTER_DATA } from 'constant';
import GameIntro from 'screens/games/game-intro/GameIntro';
import { ActiveMediaPreset } from 'types';

import './shapeHuntScreen-styles.scss';

const ShapeHuntScreen = () => {
  return (
    <div className="shape-hunt-screen__container">
      <img src={PhoneStatusBarImage} alt="status bar" className="audio-screen__status-bar" />
      <GameIntro activeMediaPreset={ActiveMediaPreset.ShapeSpotting} data={SHAPE_SPOTTER_DATA} />
    </div>
  );
};

export default ShapeHuntScreen;
