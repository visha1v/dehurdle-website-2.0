import { CustomAppWrapper, HeroSectionCard } from 'components';
import { REQUEST_DEMO_HERO_SECTION_DATA } from 'constant';

import { RequestDemoForm, WhatToExpect } from './components';

const RequestDemo = () => {
  return (
    <CustomAppWrapper>
      <HeroSectionCard {...REQUEST_DEMO_HERO_SECTION_DATA} />
      <WhatToExpect />
      <RequestDemoForm />
    </CustomAppWrapper>
  );
};

export default RequestDemo;
