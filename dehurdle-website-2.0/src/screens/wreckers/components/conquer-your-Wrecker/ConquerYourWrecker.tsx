import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { FeatureCard } from 'components';
import { REVEAL_CONQUERER_WRECKER_DATA, ROUTES } from 'constant';

const ConquerYourWrecker = () => {
  const navigate = useNavigate();

  return REVEAL_CONQUERER_WRECKER_DATA.map(section => {
    const onButtonClick = () => {
      navigate(ROUTES.WRECKER_ASSESSMENT_INTRO);
    };

    return <FeatureCard {...section} id={''} key={section.id} onButtonClick={onButtonClick} />;
  });
};

export default memo(ConquerYourWrecker);
