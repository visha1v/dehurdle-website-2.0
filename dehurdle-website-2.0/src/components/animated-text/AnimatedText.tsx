import React from 'react';

import { motion } from 'framer-motion';
import { interpolateColor } from 'utils';

interface IAnimatedTextProps {
  text: string;
  scrollProgress: number;
  startColor: string;
  endColor: string;
}

const AnimatedText: React.FC<IAnimatedTextProps> = props => {
  const { text, scrollProgress, startColor, endColor } = props;
  return text.split('').map((letter, index) => {
    const letterFactor = Math.max(0, Math.min(scrollProgress * text.length - index, 1));
    return (
      <motion.span
        key={`${index}-${letter}`}
        style={{
          color: interpolateColor(startColor, endColor, letterFactor),
          transition: 'color 0.1s ease',
        }}>
        {letter}
      </motion.span>
    );
  });
};

export default AnimatedText;
