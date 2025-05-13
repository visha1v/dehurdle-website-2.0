import { useNavigate } from 'react-router-dom';

import { GameFailureImage } from 'assets';
import { CustomButton } from 'components';
import { ROUTES, geHomeLottieSize } from 'constant';
import { useViewport } from 'hooks';
import { translate } from 'locales';
import colors from 'theme/colors';

import { Typography } from '@mui/material';

import './assessment-styles.scss';

const Assessment = () => {
  const { isMobile, isTablet } = useViewport();
  const navigate = useNavigate();

  const lottieSize = geHomeLottieSize(isMobile, isTablet);

  const onTakeAssessmentClick = () => {
    navigate(ROUTES.WRECKER_ASSESSMENT_INTRO);
  };

  return (
    <div className="assessment">
      <div className="assessment__lottie">
        <GameFailureImage color={colors.iceWhite} style={lottieSize} />
      </div>
      <div className="assessment__content">
        <Typography className="assessment__title">
          {translate('screens.home.home-assessment.title')}
        </Typography>
        {/* <Typography className="assessmentSection__subtitle">
          {translate('screens.home.assessmentSection.subtitle')}
        </Typography> */}
        <CustomButton
          buttonContainerClassName="assessment__button"
          label={translate('screens.home.home-assessment.button-title')}
          onClick={onTakeAssessmentClick}
        />
      </div>
    </div>
  );
};

export default Assessment;
