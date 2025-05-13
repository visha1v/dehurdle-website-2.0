import React, { useLayoutEffect, useRef, useState } from 'react';

import { AnimatedText } from 'components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translate } from 'locales';
import palette from 'theme/colors';

import { Typography } from '@mui/material';

import './homeDescription-styles.scss';

gsap.registerPlugin(ScrollTrigger);

const HomeDescription: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const text = translate('screens.home.home-description.description');

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.home-description__container',
        scrub: true,
        pin: true,
        onUpdate: self => {
          setScrollProgress(self.progress);
        },
      },
    });

    tl.to({}, { duration: 1, y: 0 });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="home-description__container">
      <Typography className="home-description__sub-container" ref={textRef}>
        <AnimatedText
          endColor={palette.nightshadeBlue}
          scrollProgress={scrollProgress}
          startColor={palette.peace}
          text={text}
        />
      </Typography>
    </div>
  );
};

export default HomeDescription;
