import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LocalStorageKeys, ROUTES } from 'constant';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import {
  AboutUS,
  EnterpriseSession,
  Home,
  PersonalDetails,
  ProductDemo,
  RequestDemo,
  Science,
  SignUp,
  WreckerAssessment,
  Wreckers,
} from 'screens';
import ThankYou from 'screens/wrecker-assessment/thank-you/ThankYou';
import WreckerAssessmentIntro from 'screens/wrecker-assessment/wrecker-assessment-intro/WreckerAssessmentIntro';
import { getLocalStorageValue } from 'utils';

const Router = observer(() => {
  const { domainStore } = useStore();
  const { isLoggedIn } = domainStore;
  const isLocalLoggedIn = getLocalStorageValue(LocalStorageKeys.IsLoggedIn) || isLoggedIn;

  const requireAuth = (element: React.ReactNode) => {
    return isLocalLoggedIn ? element : <Navigate to={ROUTES.SIGN_UP} />;
  };

  return (
    <BrowserRouter basename={ROUTES.HOME}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUS />} />
        <Route path={ROUTES.WRECKERS} element={<Wreckers />} />
        <Route path={ROUTES.PERSONAL_DETAILS} element={requireAuth(<PersonalDetails />)} />
        <Route path={ROUTES.SCIENCE} element={<Science />} />
        <Route path={ROUTES.REQUEST_DEMO} element={<RequestDemo />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.WRECKER_ASSESSMENT} element={requireAuth(<WreckerAssessment />)} />
        <Route path={ROUTES.WRECKER_ASSESSMENT_INTRO} element={<WreckerAssessmentIntro />} />
        <Route path={ROUTES.CONGRATULATIONS} element={<ThankYou />} />
        <Route path={ROUTES.ENTERPRISE} element={<EnterpriseSession />} />
        <Route path={ROUTES.EXPLORE} element={<ProductDemo />} />
      </Routes>
    </BrowserRouter>
  );
});

export default Router;
