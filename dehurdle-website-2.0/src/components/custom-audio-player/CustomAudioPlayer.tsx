import { RefObject, SyntheticEvent } from 'react';

import { convertTime } from 'utils';

import './customAudioPlayer-styles.scss';

interface ICustomAudioPlayer {
  audioUrl: string;
  onComplete?: () => void;
  onLoadComplete?: (durationTime: string, duration?: number) => void;
  onProgress: (currentTime?: number, percentage?: number, time?: string) => void;
  playerRef: RefObject<HTMLAudioElement>;
}

const CustomAudioPlayer = (props: ICustomAudioPlayer) => {
  const {
    audioUrl,
    onComplete = () => {},
    onLoadComplete = () => {},
    onProgress,
    playerRef,
  } = props;

  const handleLoadComplete = (event: SyntheticEvent<HTMLAudioElement, Event>) => {
    if (event.currentTarget) {
      const duration = event?.currentTarget?.duration || 0;

      const durationTime = convertTime(duration);
      onLoadComplete(durationTime, duration);
    }
  };

  const handleProgress = (event: SyntheticEvent<HTMLAudioElement, Event>) => {
    if (event.currentTarget) {
      const currentTime = event?.currentTarget?.currentTime || 0;
      const duration = event?.currentTarget?.duration || 0;
      const progress = (currentTime * 100) / duration;

      const progressTime = convertTime(currentTime);
      onProgress(currentTime, progress, progressTime);
    }
  };

  return (
    <audio
      ref={playerRef}
      onTimeUpdate={handleProgress}
      onLoadedData={handleLoadComplete}
      onEnded={() => onComplete()}
      className="custom-audio-player__audio"
      src={audioUrl}
    />
  );
};

export default CustomAudioPlayer;
