import { CustomAppWrapper } from 'components';

import { ApproachSteps, Birth, ConquerYourWrecker, HeroSection, TheWreckers } from './components';
import './wreckers-styles.scss';

const Wreckers = () => {
  return (
    <CustomAppWrapper>
      <HeroSection />
      {/**Extra div cause without this div animation in this section will not work smoothly */}
      <div className="wreckers__container">
        <TheWreckers />
      </div>
      <Birth />
      <ApproachSteps />
      <ConquerYourWrecker />
    </CustomAppWrapper>
  );
};

export default Wreckers;
