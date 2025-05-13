import { CloseIcon } from 'assets';
import { GameType } from 'constant';
import palette from 'theme/colors';

import { Typography } from '@mui/material';

import './game-header-styles.scss';

interface IGameHeaderProps {
  gameName: string;
  gameType?: string;
  onClick?: () => void;
  showCloseIcon?: boolean;
}

const GameHeader = (props: IGameHeaderProps) => {
  const { gameName, gameType = GameType.SHAPE_SPOTTING, onClick, showCloseIcon = true } = props;

  const iconColor = gameType === GameType.STORY_TELLING ? palette.white : palette.darkCyan;
  const titleColor = gameType === GameType.STORY_TELLING ? palette.white : palette.nightshadeBlue;

  const onCloseClick = () => {
    onClick && onClick();
  };

  return (
    <div className="game-header__container" onClick={onCloseClick}>
      {showCloseIcon ? (
        <CloseIcon color={iconColor} className="game-header__icon" />
      ) : (
        <div className="game-header__sub-container" />
      )}
      <Typography style={{ color: titleColor }} className="game-header__title">
        {gameName}
      </Typography>
      <div className="game-header__sub-container" />
    </div>
  );
};

export default GameHeader;
