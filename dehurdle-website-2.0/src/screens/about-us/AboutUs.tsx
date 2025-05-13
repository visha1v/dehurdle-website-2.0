import { CustomAppWrapper, HeroSectionCard } from 'components';
import { ABOUT_US_HERO_SECTION_DATA } from 'constant';

import './aboutUs-styles.scss';
import {
  AboutDehurdle,
  DehurdleFounder,
  DehurdleSpeciality,
  JoinDehurdle,
  TakeAssessment,
} from './components';

const AboutUs = () => {
  return (
    <CustomAppWrapper>
      <AboutDehurdle />
      <HeroSectionCard {...ABOUT_US_HERO_SECTION_DATA} />
      <DehurdleSpeciality />
      <DehurdleFounder />
      <TakeAssessment />
      <JoinDehurdle />
    </CustomAppWrapper>
  );
};

export default AboutUs;
