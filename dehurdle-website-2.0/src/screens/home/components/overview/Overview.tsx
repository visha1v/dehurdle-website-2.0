import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { OVERVIEW_CARD_DATA } from 'constant';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useViewport } from 'hooks';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import OverviewCard from './overview-card/OverviewCard';
import './overview-styles.scss';

gsap.registerPlugin(ScrollTrigger);

const initialContainerHeight = 1000;
const initialMainContainerHeight = 40;

const OverviewSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const { isTabPortrait } = useViewport();

  const renderOverviewCards = () => {
    return (
      <div
        className={
          isTabPortrait ? 'overview__overview-card-container' : 'overview__card-container'
        }>
        {OVERVIEW_CARD_DATA.map((cardData, index) => (
          <OverviewCard key={`${cardData.title}-${index}`} {...cardData} />
        ))}
      </div>
    );
  };
  useLayoutEffect(() => {
    if (!isTabPortrait) {
      const containerHeight = containerRef.current?.clientHeight || initialContainerHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.overview__container',
          pin: true,
          scrub: true,
          markers: false,
        },
      });

      OVERVIEW_CARD_DATA.forEach((_, index) => {
        if (index > 0) {
          tl.fromTo(
            `.overview__card:nth-child(${index + 1})`,
            {
              y: containerHeight * OVERVIEW_CARD_DATA.length * 2,
              rotation: -50,
            },
            {
              y: 0,
              rotation: 0,
              duration: 2,
              ease: 'power1.inOut',
            },
          );
          tl.addPause();
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [isTabPortrait]);

  useEffect(() => {
    if (!isTabPortrait) {
      const mainContainerHeight =
        (containerRef.current?.clientHeight || initialMainContainerHeight) * 0.34;
      setContainerHeight(mainContainerHeight);
    } else {
      setContainerHeight(0);
    }
  }, [isTabPortrait]);

  return (
    <div
      className="overview__container"
      style={{ height: isTabPortrait ? '' : `${containerHeight}%` }}>
      <div className="overview__sub-container" ref={containerRef}>
        <Typography className="overview__title">
          {translate('screens.home.overview.title')}
        </Typography>
        <Typography className="overview__description">
          {translate('screens.home.overview.description')}
        </Typography>
      </div>
      <div className="overview__main-container">{renderOverviewCards()}</div>
    </div>
  );
};

export default OverviewSection;
