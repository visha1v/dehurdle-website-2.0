import { useLayoutEffect, useRef, useState } from 'react';

import { GrandMasterImage, IllusionLeftImage, IllusionRightImage } from 'assets';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translate } from 'locales';
import { interpolateColor } from 'utils';

import { Typography } from '@mui/material';

import './birth-styles.scss';

gsap.registerPlugin(ScrollTrigger);

const Birth = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const grandMasterImageRef = useRef<SVGSVGElement>(null);
  const [progress1, setProgress1] = useState<number>(0);
  const [progress2, setProgress2] = useState<number>(0);
  const [progress3, setProgress3] = useState<number>(0);
  const [totalCharCount1, setTotalCharCount1] = useState<number>(0);
  const [totalCharCount2, setTotalCharCount2] = useState<number>(0);
  const [totalCharCount3, setTotalCharCount3] = useState<number>(0);

  useLayoutEffect(() => {
    const section1Text =
      translate('screens.wreckers.birth.wreckers.title') +
      translate('screens.wreckers.birth.wreckers.description1') +
      translate('screens.wreckers.birth.wreckers.description2');

    const section2Text =
      translate('screens.wreckers.birth.intentions.title') +
      translate('screens.wreckers.birth.intentions.description');

    const section3Text =
      translate('screens.wreckers.birth.truth.description1') +
      translate('screens.wreckers.birth.truth.description2');

    setTotalCharCount1(section1Text.length);
    setTotalCharCount2(section2Text.length);
    setTotalCharCount3(section3Text.length);
  }, []);

  const renderText = (
    text: string,
    progress: number,
    sectionProgress: number,
    totalOffset: number = 0,
  ) => {
    return text.split('').map((letter: string, index: number) => {
      const globalCharPosition = totalOffset + index;

      const charProgress = Math.max(
        0,
        Math.min(sectionProgress * progress * 0.5 - globalCharPosition / 2, 1),
      );
      // TODO: Need to see why we are not using Animated Text
      return (
        <motion.span
          key={`${letter}-${index}`}
          style={{
            color: interpolateColor('#c9d3d8', '#ffffff', charProgress),
            transition: 'color 0.1s ease',
            whiteSpace: 'pre-line',
          }}>
          {letter}
        </motion.span>
      );
    });
  };

  useLayoutEffect(() => {
    const grandMasterImageHeight = grandMasterImageRef.current?.clientHeight || 300;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.birth__sub-container-1',
        start: 'top 15%',
        pin: true,
        pinSpacing: true,
        onUpdate: self => {
          setProgress1(self.progress);
        },
      });

      ScrollTrigger.create({
        trigger: '.birth__sub-container-2',
        start: 'top 15%',
        pin: true,
        pinSpacing: true,
        onUpdate: self => {
          setProgress2(self.progress);
        },
      });

      ScrollTrigger.create({
        trigger: '.birth__sub-container-3',
        start: `+=${grandMasterImageHeight}`,
        pin: true,
        pinSpacing: true,
        onUpdate: self => {
          setProgress3(self.progress);
        },
      });
    });

    return () => {
      ctx.kill();
    };
  }, []);

  return (
    <div className="birth__container">
      <div className="birth__sub-container-1">
        <div className="birth__sub-container-1-content">
          <Typography className="birth__title">
            {renderText(
              translate('screens.wreckers.birth.wreckers.title'),
              progress1,
              totalCharCount1,
              0,
            )}
          </Typography>
          <Typography className="birth__sub-title">
            {renderText(
              translate('screens.wreckers.birth.wreckers.description1'),
              progress1,
              totalCharCount1,
              translate('screens.wreckers.birth.wreckers.title').length,
            )}
          </Typography>
          <Typography className="birth__sub-title">
            {renderText(
              translate('screens.wreckers.birth.wreckers.description2'),
              progress1,
              totalCharCount1,
              translate('screens.wreckers.birth.wreckers.title').length +
                translate('screens.wreckers.birth.wreckers.description1').length,
            )}
          </Typography>
        </div>
        <div className="birth__sub-container-1-bg-image-container"></div>
      </div>
      <div className="birth__sub-container-2">
        <div className="birth__sub-container-2-image-container">
          <IllusionLeftImage className="birth__sub-container-2-image-container-image" />
          <IllusionRightImage className="birth__sub-container-2-image-container-image" />
        </div>
        <div className="birth__sub-container-2-content">
          <Typography className="birth__title">
            {renderText(
              translate('screens.wreckers.birth.intentions.title'),
              progress2,
              totalCharCount2,
              0,
            )}
          </Typography>
          <Typography className="birth__sub-title">
            {renderText(
              translate('screens.wreckers.birth.intentions.description'),
              progress2,
              totalCharCount2,
              translate('screens.wreckers.birth.intentions.title').length,
            )}
          </Typography>
        </div>
      </div>
      <div className="birth__sub-container-3">
        <GrandMasterImage className="birth__sub-container-3-image" ref={grandMasterImageRef} />
        <div className="birth__sub-container-3-content" ref={textRef}>
          <Typography className="birth__sub-title">
            {renderText(
              translate('screens.wreckers.birth.truth.description1'),
              progress3,
              totalCharCount3,
              0,
            )}
          </Typography>
          <Typography className="birth__sub-title">
            {renderText(
              translate('screens.wreckers.birth.truth.description2'),
              progress3,
              totalCharCount3,
              translate('screens.wreckers.birth.truth.description1').length,
            )}
          </Typography>
          {/* <Typography className="birth__sub-title">
            {renderText(
              translate('screens.wreckers.birth.truth.description3'),
              progress3,
              totalCharCount3,
              translate('screens.wreckers.birth.truth.description1').length +
                translate('screens.wreckers.birth.truth.description2').length,
            )}
          </Typography> */}
        </div>
      </div>
    </div>
  );
};

export default Birth;
