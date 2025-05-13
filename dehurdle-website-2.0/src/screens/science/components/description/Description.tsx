import React, { useRef } from 'react';

import { translate } from 'locales';

import { Typography } from '@mui/material';

import './description-styles.scss';

//TODO: removed for now. need to check later
// gsap.registerPlugin(ScrollTrigger);

const Description: React.FC = () => {
  // const [scrollProgress, setScrollProgress] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  // const text = translate('screens.science.section-6.text');

  // useLayoutEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '.description__container',
  //       scrub: true,
  //       pin: true,
  //       onUpdate: self => {
  //         setScrollProgress(self.progress);
  //       },
  //     },
  //   });

  //   tl.to({}, { duration: 1, y: 0 });

  //   return () => {
  //     ScrollTrigger.killAll();
  //   };
  // }, []);

  return (
    <div className="description__container">
      <Typography className="description__sub-container" ref={textRef}>
        {/* <AnimatedText
          endColor={palette.trekkingBlue}
          scrollProgress={scrollProgress}
          startColor={palette.peace}
          text={text}
        /> */}
        {translate('screens.science.description.text')}
      </Typography>
    </div>
  );
};

export default Description;
