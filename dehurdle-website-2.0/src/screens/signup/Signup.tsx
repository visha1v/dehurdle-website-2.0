import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomAppWrapper } from 'components';
import {
  ApiStatusPreset,
  CustomAppWrapperPreset,
  LocalStorageKeys,
  ROUTES,
  ToastPreset,
} from 'constant';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import { getLocalStorageValue, getToastMessage, removeLocalStorageValue } from 'utils';

import ProfessionStatus from './profession-status/ProfessionStatus';
import Profession from './profession/Profession';
import Registration from './registration/Registration';
import VerifyOtp from './verify-otp/VerifyOtp';

const SignUp = observer(() => {
  const { domainStore, viewStore } = useStore();
  const { authenticateUser, submitAuthenticationOtp, resendOtp } = domainStore;
  const { apiStatusStore, toastStore } = viewStore;
  const { getApiStatus, setApiStatus } = apiStatusStore;
  const { error: authenticationError, isLoading: isUserAuthenticating } =
    getApiStatus(ApiStatusPreset.AuthenticateUser) || {};
  const { popToast } = toastStore;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSignUpFlow, setIsSignUpFlow] = useState(true);
  const [showProfession, setShowProfession] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState('');
  const [showProfessionConfirmation, setShowProfessionConfirmation] = useState(false);
  const [isFromProfessionStatus, setIsFromProfessionStatus] = useState(false);

  const configData = getLocalStorageValue(LocalStorageKeys.ConfigData);
  const { professions = [] } = configData || {};

  const onChange = (value: string) => {
    setEmail(value);
  };

  const onSignUpPress = () => {
    const successCallback = () => {
      setIsSignUpFlow(false);
    };
    const payload = {
      email,
      platform: 'WEB',
      profession: selectedProfession,
    };
    authenticateUser(payload, successCallback);
  };

  const onResendOtpPress = () => {
    resendOtp({ email });
  };

  const onVerifyOtpPress = (otp: string) => {
    const successCallback = () => {
      removeLocalStorageValue(LocalStorageKeys.CurrentQuestionNumber);
      removeLocalStorageValue(LocalStorageKeys.WreckerAnswer);
      reaction(
        () => domainStore.hasTakenAssessment,
        hasTakenAssessment => {
          if (hasTakenAssessment) {
            navigate(ROUTES.CONGRATULATIONS);
          } else {
            navigate(ROUTES.WRECKER_ASSESSMENT);
          }
        },
        { fireImmediately: true },
      );
    };
    submitAuthenticationOtp({ email_otp: otp }, successCallback);
  };

  const showErrorMessage = (code: string) => {
    popToast({ type: ToastPreset.Error, subTitle: getToastMessage(code) });
    setApiStatus({ id: ApiStatusPreset.AuthenticateUser, error: null });
  };

  useEffect(() => {
    const error = authenticationError?.code;
    error && showErrorMessage(error);
  }, [authenticationError, isUserAuthenticating]);

  useEffect(() => {
    if (!configData) {
      navigate(ROUTES.WRECKER_ASSESSMENT_INTRO);
    }
  }, []);

  const handleProfessionChange = (profession: string) => {
    setSelectedProfession(profession);
  };

  const handleContinueClick = () => {
    setShowProfession(false);
    setIsFromProfessionStatus(true);
  };

  const handleRegistrationBackPress = () => {
    if (!selectedProfession) {
      setShowProfessionConfirmation(true);
      setShowProfession(false);
      setEmail('');
    } else {
      setShowProfessionConfirmation(false);
      setShowProfession(true);
    }
    setIsFromProfessionStatus(false);
  };

  const handleProfessionConfirmation = () => {
    setShowProfessionConfirmation(false);
    setShowProfession(true);
  };

  const handleProfessionCancel = () => {
    setShowProfessionConfirmation(false);
    // navigate(ROUTES.HOME);
    // popToast({
    //   type: ToastPreset.Warning,
    //   title: translate('screens.sign-up.profession-status.cancel-message'),
    // });
  };

  const renderComponent = () => {
    let component = (
      <VerifyOtp
        email={email}
        onResendOtpPress={onResendOtpPress}
        onVerifyOtpPress={onVerifyOtpPress}
        onOtpBackClick={() => setIsSignUpFlow(true)}
      />
    );

    if (showProfessionConfirmation) {
      component = (
        <ProfessionStatus
          onConfirmClick={handleProfessionConfirmation}
          onCancelClick={handleProfessionCancel}
        />
      );
    } else if (showProfession) {
      component = (
        <Profession
          handleContinueClick={handleContinueClick}
          handleProfessionChange={handleProfessionChange}
          professions={professions}
          selectedProfession={selectedProfession}
        />
      );
    } else if (isSignUpFlow) {
      component = (
        <Registration
          email={email}
          isButtonLoading={!!isUserAuthenticating}
          isProfessionRegex={isFromProfessionStatus}
          onBackPress={handleRegistrationBackPress}
          onChange={onChange}
          onSignUpPress={onSignUpPress}
          selectedProfession={selectedProfession}
        />
      );
    }

    return component;
  };

  return (
    <CustomAppWrapper preset={CustomAppWrapperPreset.Quiz} isQuizFlow>
      {renderComponent()}
    </CustomAppWrapper>
  );
});

export default SignUp;
