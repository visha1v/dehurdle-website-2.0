import { CustomAppWrapper, HeroSectionCard } from 'components';
import { ENTERPRISE_HERO_SECTION_DATA } from 'constant';

import {
  ClarityCoaching,
  DecisionMakerTestimonials,
  DehurdleDifference,
  DehurdleWorking,
  EnterpriseSolution,
  Organisations,
  UserTestimonials,
} from './components';
import './enterpriseSession-styles.scss';

const EnterpriseSession = () => {
  return (
    <CustomAppWrapper>
      <HeroSectionCard {...ENTERPRISE_HERO_SECTION_DATA} />
      <DehurdleWorking />
      <EnterpriseSolution />
      <DehurdleDifference />
      <Organisations />
      <DecisionMakerTestimonials />
      <UserTestimonials />
      <ClarityCoaching />
    </CustomAppWrapper>
  );
};

export default EnterpriseSession;
