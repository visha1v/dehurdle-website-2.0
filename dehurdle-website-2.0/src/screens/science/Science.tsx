import { CustomAppWrapper, HeroSectionCard } from 'components';
import { SCIENCE_HERO_SECTION_DATA } from 'constant';

import {
  Approach,
  DailyChallenges,
  DehurdleAssessment,
  Description,
  EternalRivals,
  Grandmasters,
} from './components';

const Science = () => {
  return (
    <CustomAppWrapper>
      <HeroSectionCard {...SCIENCE_HERO_SECTION_DATA} />
      <EternalRivals />
      <Grandmasters />
      <DehurdleAssessment />
      <Approach />
      <Description />
      <DailyChallenges />
    </CustomAppWrapper>
  );
};

export default Science;
