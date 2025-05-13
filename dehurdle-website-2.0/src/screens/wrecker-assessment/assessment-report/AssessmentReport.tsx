import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton, CustomColorBar } from 'components';
import { DeviceType, ROUTES } from 'constant';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import moment from 'moment';

import { Typography } from '@mui/material';

import './assessmentReport-styles.scss';
import ReportTab from './report-tab/ReportTab';
import WreckerCard from './wrecker-card/WreckerCard';

const AssessmentReport = observer(() => {
  const { domainStore } = useStore();
  const { logoutUser, wreckerStore } = domainStore;
  const { dateOfAssessment, totalScore, wreckers } = wreckerStore;

  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);

  const onButtonClick = (deviceType?: DeviceType) => async () => {
    if (deviceType === DeviceType.IsTabMobile && currentTab === 0) {
      setCurrentTab(1);
    } else {
      await logoutUser();
      navigate(ROUTES.CONGRATULATIONS, { replace: true });
    }
  };

  const onTabClick = (event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const getAssessmentDate = () => {
    return moment(dateOfAssessment).format('DD MMM YYYY');
  };

  const renderWreckerCards = () => {
    return wreckers.map((card, index) => {
      const isFirstItem = index === 0;
      const isLastItem = index === wreckers.length - 1;
      const { id, name, score, description } = card;

      return (
        <WreckerCard
          isFirstItem={isFirstItem}
          isLastItem={isLastItem}
          key={id}
          name={name}
          score={score}
          description={description}
        />
      );
    });
  };

  const renderTabMobileScreen = () => {
    return (
      <div className="assessment-report__mobile-container">
        <div className="assessment-report__header">
          <ReportTab tabs={MOBILE_TABS} onTabClick={onTabClick} currentTab={currentTab} />
        </div>
        <div className="assessment-report__button-container">
          <CustomButton
            buttonContainerClassName="assessment-report__button"
            label={translate('common.continue')}
            onClick={onButtonClick(DeviceType.IsTabMobile)}
          />
        </div>
      </div>
    );
  };

  const renderDesktopScreen = () => {
    return (
      <div className="assessment-report__container">
        <div className="assessment-report__sub-container">
          <div className="assessment-report__main-container">
            <div className="assessment-report__bar-container">
              <Typography className="assessment-report__label">
                {translate('screens.assessment-report.tab-1.title')}
              </Typography>
              <div className="assessment-report__bar-sub-container">
                <Typography className="assessment-report__title">
                  {translate('screens.assessment-report.thriving')}
                </Typography>
                <CustomColorBar percentage={totalScore || 0} />
                <Typography className="assessment-report__sub-title">
                  {translate('screens.assessment-report.surviving')}
                </Typography>
                <Typography className="assessment-report__date">
                  {`${translate('screens.assessment-report.assessment-date')}${getAssessmentDate()}`}
                </Typography>
              </div>
            </div>
            <div className="assessment-report__wrecker-container">
              <Typography className="assessment-report__label">
                {translate('screens.assessment-report.tab-2.title')}
              </Typography>
              <div className="assessment-report__wrecker-cards">{renderWreckerCards()}</div>
            </div>
          </div>
          <CustomButton
            buttonContainerClassName="assessment-report__button"
            label={translate('common.continue')}
            onClick={onButtonClick(DeviceType.IsDesktop)}
          />
        </div>
      </div>
    );
  };

  const MOBILE_TABS = [
    {
      title: translate('screens.assessment-report.score'),
      component: (
        <div className="assessment-report__score">
          <Typography className="assessment-report__score_title">
            {translate('screens.assessment-report.thriving')}
          </Typography>
          <CustomColorBar percentage={totalScore || 0} />
          <Typography className="assessment-report__score_title">
            {translate('screens.assessment-report.surviving')}
          </Typography>
          <Typography className="assessment-report__date">
            {`${translate('screens.assessment-report.assessment-date')}${getAssessmentDate()}`}
          </Typography>
        </div>
      ),
    },
    {
      title: translate('screens.assessment-report.wreckers'),
      component: (
        <div className="assessment-report__wrecker-card-container">{renderWreckerCards()}</div>
      ),
    },
  ];

  useEffect(() => {
    const handleReload = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        navigate(ROUTES.CONGRATULATIONS);
      }
    };

    window.addEventListener('pageshow', handleReload);
    return () => {
      window.removeEventListener('pageshow', handleReload);
    };
  }, []);

  useEffect(() => {
    const handleUnloadEvent = () => {
      onButtonClick();
    };
    window.addEventListener('beforeunload', handleUnloadEvent);
    return () => {
      window.removeEventListener('beforeunload', handleUnloadEvent);
    };
  }, []);

  return (
    <div className="assessment-report">
      {renderTabMobileScreen()}
      {renderDesktopScreen()}
    </div>
  );
});

export default AssessmentReport;
