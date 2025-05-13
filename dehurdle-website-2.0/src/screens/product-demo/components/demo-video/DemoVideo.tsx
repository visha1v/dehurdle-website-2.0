import { useContext, useEffect, useRef, useState } from 'react';

import { VideoThumbnail } from 'assets';
import { DEMO_VIDEO_LINK } from 'constant';
import { ActiveMediaContext } from 'context';
import { ActiveMediaPreset } from 'types';

import { Replay } from '@mui/icons-material';

import './demoVideo-styles.scss';

interface IDemoVideo {
  isVideoPlaying: boolean;
}
const DemoVideo = (props: IDemoVideo) => {
  const { isVideoPlaying } = props;
  const { setActiveMedia } = useContext(ActiveMediaContext) || { setActiveMedia: () => {} };

  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleReplayClick = () => {
    if (videoRef.current) {
      videoRef.current?.play();
      setIsVideoEnded(false);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
  };

  const handleVideoPlay = () => {
    setActiveMedia(ActiveMediaPreset.DemoVideo);
  };

  useEffect(() => {
    if (isVideoPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div className="demo-video__container">
      <div className="demo-video__video-container">
        <video
          autoPlay={isVideoPlaying}
          className="demo-video__video"
          controls={!isVideoEnded}
          controlsList="nodownload"
          disablePictureInPicture
          onEnded={handleVideoEnded}
          onPlay={handleVideoPlay}
          playsInline
          poster={VideoThumbnail}
          ref={videoRef}
          src={DEMO_VIDEO_LINK}
        />
        {isVideoEnded && (
          <div className="demo-video__overlay">
            <div className="demo-video__replay-container">
              <Replay className="demo-video__replay-icon" onClick={handleReplayClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoVideo;
