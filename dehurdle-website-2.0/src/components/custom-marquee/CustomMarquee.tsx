import React from 'react';
import Marquee from 'react-fast-marquee';

import { CAROUSEL_SPEED, CarouselDirection } from 'constant';

interface CustomMarqueeProps {
  direction?: CarouselDirection;
  speed?: number;
  children: React.ReactNode;
  className?: string;
}

const CustomMarquee: React.FC<CustomMarqueeProps> = ({
  direction = CarouselDirection.Left,
  speed = CAROUSEL_SPEED,
  children,
  className = '',
}) => {
  return (
    <Marquee className={className} direction={direction} speed={speed}>
      {children}
    </Marquee>
  );
};

export default CustomMarquee;
