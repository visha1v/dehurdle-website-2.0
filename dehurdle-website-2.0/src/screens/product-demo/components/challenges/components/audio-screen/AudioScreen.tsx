import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
  MasteryImage,
  MeditationImage,
  PauseIcon,
  PhoneStatusBarImage,
  PlayIcon,
  ReplayIcon,
} from 'assets';
import { CustomAudioPlayer } from 'components';
import {
  ActivityType,
  AudioScreenPreset,
  MATCH_COLUMNS_DATA,
  ResultStatus,
  SELECT_THE_STATEMENT_DATA,
} from 'constant';
import { ActiveMediaContext } from 'context';
import { translate } from 'locales';
import { GameResult, MatchColumns, SelectStatement } from 'screens/games';
import { ActiveMediaPreset, IBreakpoints, MasteryGamesPreset } from 'types';

import Header from '../header/Header';

import './audioScreen-styles.scss';

interface IAudioScreen {
  audioBreakpoints?: Array<IBreakpoints>;
  audioUrl: string;
  instanceId: string;
  isMeditation?: boolean;
  isPlaying?: boolean;
  title: string;
}

const AudioScreen = (props: IAudioScreen) => {
  const {
    audioBreakpoints = [],
    audioUrl,
    instanceId,
    isMeditation,
    isPlaying: isAudioPlaying = false,
    title,
  } = props;

  const playerRef = useRef<HTMLAudioElement>(null);
  const visitedBreakpoints = useRef<number[]>([]);

  const { setActiveMedia } = useContext(ActiveMediaContext) || {};

  const [isPlaying, setIsPlaying] = useState(isAudioPlaying);
  const [currentAudioScreen, setCurrentAudioScreen] = useState(AudioScreenPreset.Intro);

  const Icon = isPlaying ? PauseIcon : PlayIcon;
  const containerClassname = isMeditation ? 'audio-screen__meditation' : '';
  const breakpoints = useMemo(
    () => audioBreakpoints.map(breakpoint => breakpoint.seconds),
    [audioBreakpoints.length],
  );
  const screenName = translate(
    `screens.product-demo.challenges.${isMeditation ? 'meditation' : 'mastery'}.heading`,
  );

  const handlePlayPause = (isBreakpoint?: boolean) => {
    if (isPlaying || isBreakpoint) {
      playerRef.current?.pause();
    } else {
      const activePreset = isMeditation
        ? ActiveMediaPreset.MeditationAudio
        : ActiveMediaPreset.MasteryAudio;
      playerRef.current?.play();
      setActiveMedia && setActiveMedia(activePreset);
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioRestart = () => {
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLoadComplete = (durationTime: string, duration?: number) => {
    const durationElement = document.getElementById(`duration-${instanceId}`);
    if (durationElement) durationElement.innerHTML = durationTime;
    renderBreakpoints(duration || 0);
  };

  const renderBreakpoints = (duration: number) => {
    const breakPoints = audioBreakpoints.map((breakpoint, index) => {
      const leftMargin = (breakpoint.seconds * 100) / duration;
      return (
        <div key={index} className="audio-screen__breakpoint" style={{ left: `${leftMargin}%` }} />
      );
    });

    const progressContainerElement = document.getElementById(`progressContainer-${instanceId}`);
    if (progressContainerElement) {
      const root = createRoot(progressContainerElement);
      root.render(breakPoints);
    }
  };

  function handleGameSubmit(preset: MasteryGamesPreset) {
    const childElement = document.getElementById(preset);
    const gameContainerElement = document.getElementById(`gameContainer-${instanceId}`);
    if (childElement && gameContainerElement) {
      handlePlayPause(false);
      gameContainerElement.className = 'audio-screen__game-container';
      childElement.parentNode?.removeChild(childElement);
      playerRef.current?.play();
      setIsPlaying(true);
    }
  }

  function renderGames(preset: string) {
    let game;
    switch (preset) {
      case MasteryGamesPreset.MatchColumns:
        game = (
          <MatchColumns
            data={MATCH_COLUMNS_DATA}
            handleSubmitPress={() => handleGameSubmit(preset)}
            showLoader={false}
          />
        );
        break;

      case MasteryGamesPreset.SelectStatement:
        game = (
          <SelectStatement
            data={SELECT_THE_STATEMENT_DATA}
            handleSubmitPress={() => handleGameSubmit(preset)}
            showLoader={false}
          />
        );
    }
    const gameContainerElement = document.getElementById(`gameContainer-${instanceId}`);
    if (gameContainerElement) {
      gameContainerElement.className = 'audio-screen__game-container-blur';
      const root = createRoot(gameContainerElement);
      root.render(game);
    }
  }

  const handleProgress = (currentTime?: number, percentage?: number, time?: string) => {
    const progressElement = document.getElementById(`progress-${instanceId}`);
    const currentTimeElement = document.getElementById(`currentTime-${instanceId}`);
    if (progressElement) progressElement.style.width = `${percentage}%`;
    if (currentTimeElement) currentTimeElement.innerHTML = time || '';
    const current = Math.floor(currentTime || 0);
    if (current && breakpoints.includes(current) && !visitedBreakpoints.current.includes(current)) {
      handlePlayPause(true);
      const breakpointIndex = breakpoints.findIndex(breakpoint => breakpoint === current);
      const gamesPreset = audioBreakpoints[breakpointIndex].preset;
      renderGames(gamesPreset);
      visitedBreakpoints.current = [...visitedBreakpoints.current, current];
    }
  };

  const handleAudioComplete = () => {
    setIsPlaying(false);
    setCurrentAudioScreen(AudioScreenPreset.Result);
    visitedBreakpoints.current = [];
  };
  const getThumbnail = () => {
    return isMeditation ? (
      <MeditationImage className="audio-screen__thumbnail audio-screen__meditation" />
    ) : (
      <MasteryImage className="audio-screen__thumbnail audio-screen__mastery" />
    );
  };

  useEffect(() => {
    setIsPlaying(isAudioPlaying);
    if (isAudioPlaying) {
      playerRef.current?.play();
    } else {
      playerRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <>
      {currentAudioScreen === AudioScreenPreset.Intro ? (
        <div className={`audio-screen__container ${containerClassname}`}>
          <CustomAudioPlayer
            audioUrl={audioUrl}
            onComplete={handleAudioComplete}
            onLoadComplete={handleLoadComplete}
            onProgress={handleProgress}
            playerRef={playerRef}
          />
          <img src={PhoneStatusBarImage} alt="status bar" className="audio-screen__status-bar" />
          <Header title={title.split(' ')[0]} />
          <div className="audio-screen__sub-container">
            {getThumbnail()} <div className="audio-screen__title">{title}</div>
            <div className="audio-screen__progress-container">
              <div
                className="audio-screen__breakpoints-container"
                id={`progressContainer-${instanceId}`}
              />
              <div className="audio-screen__progress" id={`progress-${instanceId}`} />
            </div>
            <div className="audio-screen__time-container">
              <div id={`currentTime-${instanceId}`} className="audio-screen__time">
                00:00
              </div>
              <div id={`duration-${instanceId}`} className="audio-screen__time">
                00:00
              </div>
            </div>
            <div className="audio-screen__control-container">
              <ReplayIcon
                className="audio-screen__control-replay"
                onClick={() => handleAudioRestart()}
              />
              <Icon onClick={() => handlePlayPause()} className="audio-screen__control" />
            </div>
          </div>
          <div id={`gameContainer-${instanceId}`} className="audio-screen__game-container" />
        </div>
      ) : (
        <div className="audio-screen__result-container">
          <img src={PhoneStatusBarImage} alt="status bar" className="audio-screen__status-bar" />
          <GameResult
            activityType={ActivityType.Audio}
            basePoints={10}
            result={ResultStatus.Win}
            screenName={screenName}
            setCurrentAudioScreen={setCurrentAudioScreen}
          />
        </div>
      )}
    </>
  );
};

export default AudioScreen;
