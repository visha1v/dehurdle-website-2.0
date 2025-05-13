import { FeatureCard } from 'components';
import { DEHURDLE_SPECIALITY } from 'constant';

import './dehurdleSpeciality-styles.scss';

const DehurdleSpeciality = () => {
  return DEHURDLE_SPECIALITY.map(speciality => {
    const { id } = speciality;
    return <FeatureCard {...speciality} id="about-us" key={id} />;
  });
};

export default DehurdleSpeciality;
