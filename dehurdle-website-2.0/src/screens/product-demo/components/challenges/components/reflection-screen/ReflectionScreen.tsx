import { useContext, useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import { useReactMediaRecorder } from 'react-media-recorder';

import { DeleteIcon, PhoneStatusBarImage, WaveformLottie } from 'assets';
import { CustomAudioPlayer, CustomButton } from 'components';
import {
  ActivityType,
  AudioScreenPreset,
  RECORDING_ALLOWED_SECONDS,
  REFLECTION_ICON,
  ResultStatus,
  WAVE_FORM_STYLE,
} from 'constant';
import { ActiveMediaContext } from 'context';
import { translate } from 'locales';
import { GameResult } from 'screens/games';
import { ActiveMediaPreset, ReflectionStatePreset } from 'types';
import { convertTime } from 'utils';

import Header from '../header/Header';

import './reflectionScreen-styles.scss';

const ReflectionScreen = () => {
  const { setActiveMedia } = useContext(ActiveMediaContext) || {};
  const [reflectionState, setReflectionState] = useState(ReflectionStatePreset.Idle);
  const [reflectionScreen, setReflectionScreen] = useState(AudioScreenPreset.Intro);
  const [totalDuration, setTotalDuration] = useState<number>(RECORDING_ALLOWED_SECONDS);
  const [recordingInSeconds, setRecordingInSeconds] = useState<number>(0);

  const playerRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<number>(0);

  let recordingTime = 0;
  const { status, startRecording, stopRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      askPermissionOnMount: true,
    });
  const Icon = REFLECTION_ICON[reflectionState];
  const isRecorder =
    reflectionState === ReflectionStatePreset.Idle ||
    reflectionState === ReflectionStatePreset.Recording;
  const showWave = reflectionState !== ReflectionStatePreset.Idle;
  const deleteIconClassName = isRecorder
    ? 'reflection-screen__delete-icon'
    : 'reflection-screen__delete-icon-active';
  const breatheClass =
    reflectionState === ReflectionStatePreset.Recording ? 'reflection-screen__recorder-active' : '';

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      recordingTime = recordingTime + 1;
      setRecordingInSeconds(recordingTime);
      if (recordingTime === RECORDING_ALLOWED_SECONDS) {
        handleStopRecording();
      }
    }, 1000);
  };

  const handleStartRecording = () => {
    setActiveMedia && setActiveMedia(ActiveMediaPreset.ReflectionAudio);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        startTimer();
        startRecording();
        setReflectionState(ReflectionStatePreset.Recording);
      })
      .catch(() => {
        alert('Microphone permission is not granted');
      });
  };

  const handleStopRecording = () => {
    if (status === 'recording') {
      stopRecording();
      pauseRecording();
      setTotalDuration(recordingInSeconds);
      setReflectionState(ReflectionStatePreset.Paused);
      setRecordingInSeconds(0);
      clearInterval(intervalRef.current);
    }
  };

  const handlePlayPause = () => {
    if (reflectionState === ReflectionStatePreset.Paused) {
      playerRef.current?.play();
      setReflectionState(ReflectionStatePreset.Playing);
    } else {
      playerRef.current?.pause();
      setReflectionState(ReflectionStatePreset.Paused);
    }
  };

  const getTime = () => {
    const recordTime = convertTime(recordingInSeconds);
    const totalTime = convertTime(totalDuration);

    return (
      <div className="reflection-screen__time-container">
        <div className="reflection-screen__time">{recordTime}</div>/
        <div className="reflection-screen__time-container">{totalTime}</div>
      </div>
    );
  };

  const handleDelete = () => {
    clearBlobUrl();
    setTotalDuration(RECORDING_ALLOWED_SECONDS);
    setRecordingInSeconds(0);
    setReflectionState(ReflectionStatePreset.Idle);
  };

  const contextMenuLListener = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const handleReplayClick = (preset: AudioScreenPreset) => {
    setReflectionScreen(preset);
    handleDelete();
  };

  useEffect(() => {
    document.addEventListener('contextmenu', contextMenuLListener);

    return document.removeEventListener('contextmenu', contextMenuLListener);
  }, []);

  return (
    <>
      {reflectionScreen === AudioScreenPreset.Intro ? (
        <div className="reflection-screen__container">
          <CustomAudioPlayer
            audioUrl={mediaBlobUrl || ''}
            onProgress={function (currentTime?: number): void {
              setRecordingInSeconds(currentTime || 0);
            }}
            onComplete={() => setReflectionState(ReflectionStatePreset.Paused)}
            playerRef={playerRef}
          />
          <img src={PhoneStatusBarImage} alt="status bar" className="audio-screen__status-bar" />
          <Header title="Reflection" />
          <div className="reflection-screen__question">
            {translate('screens.product-demo.challenges.reflection.question')}
          </div>
          <div className="reflection-screen__prompt-head">
            {translate('screens.product-demo.challenges.reflection.prompt-head')}
          </div>
          <div className="reflection-screen__prompt">
            {translate('screens.product-demo.challenges.reflection.prompt')}
          </div>
          <div className="reflection-screen__input-box">
            <DeleteIcon className={deleteIconClassName} onClick={handleDelete} />
            <div className="reflection-screen__placeholder">{getTime()}</div>
            {showWave ? (
              <Lottie
                options={{ animationData: WaveformLottie, loop: true, autoplay: true }}
                style={WAVE_FORM_STYLE}
                isPaused={reflectionState === ReflectionStatePreset.Paused}
              />
            ) : (
              <div style={WAVE_FORM_STYLE} />
            )}
            <div className="reflection-screen__input-box-container">
              {!showWave ? (
                <div className="reflection-screen__placeholder">Tap to start recording....</div>
              ) : (
                <div className="reflection-screen__placeholder">&nbsp;</div>
              )}
              <Icon
                {...(isRecorder
                  ? {
                      onTouchStart: handleStartRecording,
                      onTouchEnd: handleStopRecording,
                      onMouseDown: handleStartRecording,
                      onMouseUp: handleStopRecording,
                      onMouseLeave: handleStopRecording,
                      onTouchCancel: handleStopRecording,
                    }
                  : { onClick: handlePlayPause })}
                className={`reflection-screen__media-icon ${breatheClass}`}
              />
            </div>
          </div>
          <CustomButton
            label={translate('common.continue')}
            onClick={() => {
              setReflectionScreen(AudioScreenPreset.Result);
            }}
            disabled={isRecorder}
          />
        </div>
      ) : (
        <div className="audio-screen__result-container">
          <img src={PhoneStatusBarImage} alt="status bar" className="audio-screen__status-bar" />
          <GameResult
            activityType={ActivityType.Audio}
            basePoints={10}
            result={ResultStatus.Win}
            screenName={translate('screens.product-demo.challenges.reflection.heading')}
            setCurrentAudioScreen={handleReplayClick}
          />
        </div>
      )}
    </>
  );
};

export default ReflectionScreen;
