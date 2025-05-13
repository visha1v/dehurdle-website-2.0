import { DEHURDLE_WORKING_DATA } from 'constant/enterprise-constants';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './dehurdleWorking-styles.scss';
import WorkingCard from './working-card/WorkingCard';

const DehurdleWorking = () => {
  return (
    <div className="dehurdle-working__container">
      <Typography className="dehurdle-working__title">
        {translate('screens.enterprise.session.dehurdle-working.initial-assessment.header')}
      </Typography>
      {DEHURDLE_WORKING_DATA.map(cardData => (
        <WorkingCard key={cardData.id} {...cardData} />
      ))}
    </div>
  );
};

export default DehurdleWorking;
