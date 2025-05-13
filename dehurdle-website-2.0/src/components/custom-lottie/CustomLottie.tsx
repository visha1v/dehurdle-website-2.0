import React from 'react';
import Lottie from 'react-lottie';

import { LOTTIE_DEFAULT_STYLE } from 'constant';

interface ICustomLottieProps {
  lottieSource: any;
  style?: React.CSSProperties;
}

const CustomLottie = (props: ICustomLottieProps) => {
  const { lottieSource, style = LOTTIE_DEFAULT_STYLE } = props;
  const defaultOptions = {
    animationData: lottieSource,
    autoplay: true,
    loop: true,
  };

  return <Lottie options={defaultOptions} style={style} />;
};

export default CustomLottie;
