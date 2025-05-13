import { DEHURDLE_DIFFERENCE_DATA } from 'constant';

import './dehurdleDifference-styles.scss';
import DifferenceCard from './difference-card/DifferenceCard';

const DehurdleDifference = () => {
  const renderCards = () => {
    return DEHURDLE_DIFFERENCE_DATA.map(item => {
      const { id } = item;

      return <DifferenceCard key={id} {...item} />;
    });
  };

  return <div className="dehurdle-difference__container">{renderCards()}</div>;
};

export default DehurdleDifference;
