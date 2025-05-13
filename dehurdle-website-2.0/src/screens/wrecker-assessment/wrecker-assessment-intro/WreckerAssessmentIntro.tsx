import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ClockIcon, MentalFitnessQuizImage, TickIcon } from 'assets';
import { CustomAppWrapper, CustomButton } from 'components';
import { API, CustomAppWrapperPreset, ROUTES, WEB_URL } from 'constant';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';

import { Checkbox, Typography } from '@mui/material';

import './wrecker-assessment-intro-styles.scss';

const WreckerAssessmentIntro = () => {
  const { applicationStore, domainStore } = useStore();
  const { configStore } = applicationStore;
  const { wreckerStore } = domainStore;
  const { getWreckerQuestions, totalQuestions } = wreckerStore;
  const { getConfig, assessmentCompletionTime } = configStore;

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxToggle = () => {
    setIsChecked(prevChecked => !prevChecked);
  };

  const onButtonClick = () => {
    navigate(ROUTES.SIGN_UP);
  };

  useEffect(() => {
    getConfig();
    getWreckerQuestions();
  }, []);

  return (
    <CustomAppWrapper preset={CustomAppWrapperPreset.Quiz} isQuizFlow>
      <div className="wrecker-assessment-intro__container">
        <img
          alt="wrecker-assessment-intro-image"
          className="wrecker-assessment-intro__image"
          src={MentalFitnessQuizImage}
        />
        <div>
          <Typography className="wrecker-assessment-intro__title">
            {translate('screens.wrecker-assessment.intro.title')}
          </Typography>
          <Typography className="wrecker-assessment-intro__subtitle">
            {translate('screens.wrecker-assessment.intro.subtitle')}
          </Typography>
          <div className="wrecker-assessment-intro__sub-container">
            <Typography className="wrecker-assessment-intro__instruction-title">
              {translate('screens.wrecker-assessment.intro.instruction')}
            </Typography>
            <ul className="wrecker-assessment-intro__instruction-list">
              <Typography component="li" className="wrecker-assessment-intro__instruction-subtitle">
                {translate('screens.wrecker-assessment.intro.first-instruction', {
                  totalQuestions: totalQuestions,
                })}
              </Typography>
              <Typography component="li" className="wrecker-assessment-intro__instruction-subtitle">
                {translate('screens.wrecker-assessment.intro.second-instruction')}
              </Typography>
            </ul>
          </div>
          <Typography className="wrecker-assessment-intro__footer-title">
            {translate('screens.wrecker-assessment.intro.footer-title')}
            <ClockIcon className="wrecker-assessment-intro__clock-icon" />
            {translate('common.mins', {
              mins: assessmentCompletionTime,
            })}
          </Typography>
          <div className="wrecker-assessment-intro__tnc-container">
            <Checkbox
              className="wrecker-assessment-intro__checkbox"
              disableRipple
              checkedIcon={
                <div className="wrecker-assessment-intro__checkbox-checked">
                  <TickIcon />
                </div>
              }
              onChange={handleCheckboxToggle}
              checked={isChecked}
            />
            <Typography className="wrecker-assessment-intro__tnc-title">
              {translate('screens.wrecker-assessment.intro.terms-and-conditions-title')}
              <a
                className="wrecker-assessment-intro__tnc-link"
                href={`${API.publicCdnUrl}${WEB_URL.TermsAndCondition}`}
                rel="noopener noreferrer"
                target="_blank">
                {translate('screens.wrecker-assessment.intro.terms-and-conditions')}
              </a>
              {translate('common.of')} {translate('dehurdle')}
            </Typography>
          </div>
          <CustomButton
            buttonContainerClassName="wrecker-assessment-intro__button"
            buttonTextClassName="wrecker-assessment-intro__button-title"
            disabled={!isChecked}
            label={translate('screens.wrecker-assessment.intro.button-label')}
            onClick={onButtonClick}
          />
        </div>
      </div>
    </CustomAppWrapper>
  );
};

export default observer(WreckerAssessmentIntro);
