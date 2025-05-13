import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomAppWrapper } from 'components';
import { CustomAppWrapperPreset, LocalStorageKeys, ROUTES, WreckerScreens } from 'constant';
import { getLocalStorageValue, setLocalStorageValue } from 'utils';

import AssessmentQuestions from './assessment-questions/AssessmentQuestions';
import AssessmentReport from './assessment-report/AssessmentReport';

const WreckerAssessment = () => {
  const [wreckerAssessmentFlow, setWreckerAssessmentFlow] = useState(
    WreckerScreens.WreckerQuestions,
  );
  const navigate = useNavigate();

  const hasTakenAssessment = getLocalStorageValue(LocalStorageKeys.HasTakenAssessment) || false;

  const onButtonClick = (screenName: WreckerScreens) => () => {
    setWreckerAssessmentFlow(screenName);
    setLocalStorageValue(LocalStorageKeys.WreckerScreenName, screenName);
  };

  const getWreckerScreen = () => {
    const currentScreenName =
      getLocalStorageValue(LocalStorageKeys.WreckerScreenName) || wreckerAssessmentFlow;
    switch (currentScreenName) {
      case WreckerScreens.WreckerQuestions:
        return <AssessmentQuestions onButtonClick={onButtonClick(WreckerScreens.WreckerReport)} />;
      case WreckerScreens.WreckerReport:
        return <AssessmentReport />;
      default:
        return <AssessmentQuestions onButtonClick={onButtonClick(WreckerScreens.WreckerReport)} />;
    }
  };

  useEffect(() => {
    if (hasTakenAssessment) {
      navigate(ROUTES.CONGRATULATIONS);
    }
  }, []);

  return (
    <CustomAppWrapper preset={CustomAppWrapperPreset.Quiz} isQuizFlow>
      {getWreckerScreen()}
    </CustomAppWrapper>
  );
};

export default WreckerAssessment;
