import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { CARDS_DATA, IHomeCardPreset } from 'constant';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useViewport } from 'hooks';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import Card from '../card/Card';

import './challengeCompass-styles.scss';

gsap.registerPlugin(ScrollTrigger);

const initialContainerHeight = 1000;

const ChallengeCompass = () => {
  const [containerHeight, setContainerHeight] = useState(initialContainerHeight);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { isTabPortrait } = useViewport();
  const updatedCardData = CARDS_DATA.map(cardData => ({
    ...cardData,
    preset: isTabPortrait ? IHomeCardPreset.Primary : IHomeCardPreset.Secondary,
  }));

  const renderCardContent = useCallback(
    (isTitle = true) =>
      CARDS_DATA.map(cardData => (
        <div
          key={cardData.number}
          className={
            isTitle
              ? 'challenge-compass__text-container-body-card'
              : 'challenge-compass__text-container-body-card-subtitle'
          }>
          {isTitle ? (
            <Typography className="challenge-compass__card-title">
              {cardData.number}. &nbsp;
              {cardData.title}
            </Typography>
          ) : (
            <Typography className="challenge-compass__card-description">
              {cardData.description}
            </Typography>
          )}
        </div>
      )),
    [CARDS_DATA],
  );

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.challenge-compass__wrapper',
        pin: true,
        scrub: true,
        markers: false,
      },
    });

    tl.fromTo(
      '.challenge-compass__card:not(:first-child)',
      {
        y: containerHeight * 2,
        rotation: -20,
      },
      {
        y: 10,
        rotation: 0,
        stagger: 0.5,
      },
    );

    tl.fromTo(
      '.challenge-compass__text-container-body-card:not(:first-child)',
      {
        y: 48,
        transform: 'translateY(200%)',
        background: 'white',
        position: 'unset',
        display: 'none',
      },
      {
        y: 0,
        display: 'unset',
        transform: 'translateY(0%)',
        position: 'absolute',
        top: 0,
        background: 'white',
        stagger: 0.5,
      },
      0,
    );

    tl.fromTo(
      '.challenge-compass__text-container-body-card:not(:last-child)',
      {
        y: 0,
        transform: 'translateY(0%)',
      },
      {
        y: -48,
        transform: 'translateY(200%)',
        stagger: 0.5,
      },
      0,
    );

    tl.fromTo(
      '.challenge-compass__text-container-body-card-subtitle:not(:first-child)',
      {
        y: 0,
        opacity: 0,
        background: 'transparent',
      },
      {
        y: 0,
        stagger: 0.5,
        background: 'white',
        opacity: 1,
      },
      0,
    );

    return () => {
      tl.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  useEffect(() => {
    const currentHeight = containerRef.current?.clientHeight || 1000;
    setContainerHeight(currentHeight);
  }, []);

  return (
    <div className={!isTabPortrait ? 'challenge-compass__wrapper' : ''}>
      <div className="challenge-compass__text-container">
        <div className="challenge-compass__text-container-header">
          <Typography variant="h4" className="challenge-compass__title">
            {translate('screens.home.challenge-compass.title')}
          </Typography>
          <Typography variant="h4" className="challenge-compass__description">
            {translate('screens.home.challenge-compass.description')}
          </Typography>
        </div>
        {!isTabPortrait && (
          <div>
            <div className="challenge-compass__card-detail-container">{renderCardContent()}</div>
            <div className="challenge-compass__card-detail-sub-container">
              {renderCardContent(false)}
            </div>
          </div>
        )}
      </div>
      <div className="challenge-compass__container" ref={containerRef}>
        {updatedCardData.map((cardData, index) => (
          <Card
            key={cardData.number}
            {...cardData}
            className={!isTabPortrait ? cardData.className : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengeCompass;
