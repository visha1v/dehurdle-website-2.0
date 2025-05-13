import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { OVERVIEW_CARD_DATA } from 'constant';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useViewport } from 'hooks';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import OverviewCard from './overview-card/OverviewCard';
import './overviewSection-styles.scss';

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
          isTabPortrait
            ? 'overview-section__overviewCardContainer'
            : 'overview-section__cardContainer'
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
          trigger: '.overview-section__container',
          pin: true,
          scrub: true,
          markers: false,
        },
      });

      OVERVIEW_CARD_DATA.forEach((_, index) => {
        if (index > 0) {
          tl.fromTo(
            `.overview-section__card:nth-child(${index + 1})`,
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
      className="overview-section__container"
      style={{ height: isTabPortrait ? '' : `${containerHeight}%` }}>
      <div className="overview-section__sub-container" ref={containerRef}>
        <Typography className="overview-section__title">
          {translate('screens.home.overview-section.title')}
        </Typography>
        <Typography className="overview-section__description">
          {translate('screens.home.overview-section.description')}
        </Typography>
      </div>
      <div className="overview-section__main-container">{renderOverviewCards()}</div>
    </div>
  );
};

export default OverviewSection;
