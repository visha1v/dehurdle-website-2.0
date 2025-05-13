import { CustomLottie } from 'components';
import { LOTTIE_SECTION_DATA } from 'constant';

import './lottieSection-styles.scss';

const renderLottie = () => {
  return LOTTIE_SECTION_DATA.map(({ source, lottieClassName }) => (
    <div
      key={lottieClassName}
      className={`lottie-section__item lottie-section__${lottieClassName}`}>
      <CustomLottie lottieSource={source} />
    </div>
  ));
};

const LottieSection = () => {
  return <div className="lottie-section__container">{renderLottie()}</div>;
};

export default LottieSection;
