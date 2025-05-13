import { useEffect, useRef, useState } from 'react';

import { ClockIcon } from 'assets';
import { CustomButton, CustomInputField } from 'components';
import {
  ApiErrors,
  ApiStatusPreset,
  ENTER,
  InputPreset,
  KEY_DOWN,
  OTP_LENGTH,
  RESEND_OTP_LIMIT,
  ToastPreset,
} from 'constant';
import { useTimer } from 'hooks';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import { getToastMessage } from 'utils';

import { Typography } from '@mui/material';

import './verifyOtp-styles.scss';

interface IVerifyOtpProps {
  email: string;
  onResendOtpPress: () => void;
  onVerifyOtpPress: (otp: string) => void;
  onOtpBackClick: () => void;
}

const VerifyOtp = observer((props: IVerifyOtpProps) => {
  const { email, onResendOtpPress, onVerifyOtpPress, onOtpBackClick } = props;

  const { viewStore } = useStore();
  const { apiStatusStore, toastStore } = viewStore;
  const { getApiStatus, setApiStatus } = apiStatusStore;
  const { popToast } = toastStore;
  const { error: authenticationError, isLoading: isUserAuthenticating } =
    getApiStatus(ApiStatusPreset.SubmitAuthenticationOtp) || {};

  const [otp, setOtp] = useState('');
  const [isOtpError, setIsOtpError] = useState(false);
  const [seconds, setSeconds] = useTimer(RESEND_OTP_LIMIT);

  const otpResendCount = useRef(0);
  const otpRef = useRef<any>(null);

  const errorCallback = (code: string) => {
    switch (code) {
      case ApiErrors.EmailOtpMismatch:
      case ApiErrors.BothOtpMismatch:
        setIsOtpError(true);
        break;
      default:
        popToast({
          type: ToastPreset.Warning,
          subTitle: getToastMessage(code),
        });
        break;
    }
    setApiStatus({ id: ApiStatusPreset.SubmitAuthenticationOtp, error: null });
  };

  const onResendOTPButtonClick = () => {
    setIsOtpError(false);
    setOtp('');
    otpResendCount.current += 1;
    setSeconds(RESEND_OTP_LIMIT);
    otpRef.current?.focusField(0);
    onResendOtpPress();
  };

  const onOtpChange = (value: string) => {
    setOtp(value);
    setIsOtpError(false);
  };

  const onConfirmClick = () => {
    onVerifyOtpPress(otp);
  };

  useEffect(() => {
    setTimeout(() => {
      otpRef.current?.focusField(0);
    }, 100);
  }, []);

  useEffect(() => {
    const error = authenticationError?.code;
    error && errorCallback(error);
  }, [authenticationError]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === ENTER) {
        otp.length === OTP_LENGTH && onConfirmClick();
        event.preventDefault();
      }
    };
    document.addEventListener(KEY_DOWN, keyDownHandler);
    return () => {
      document.removeEventListener(KEY_DOWN, keyDownHandler);
    };
  }, [otp, onConfirmClick]);

  return (
    <div className="verify-otp__container">
      <div className="verify-otp__sub-container">
        <div className="verify-otp__main-container">
          <Typography className="verify-otp__title">
            {translate('screens.sign-up.verify-otp.title', { email })}
          </Typography>
          <div className="verify-otp__input-container">
            <CustomInputField
              errorText={isOtpError && translate(`content.${ApiErrors.InvalidOtp}.message`)}
              onChange={onOtpChange}
              type={InputPreset.Otp}
              value={otp}
            />
            {seconds ? (
              <Typography className="verify-otp__resend-time">
                {translate('screens.verify-otp.resend-otp-timer')}
                <ClockIcon />
                00 : {`${seconds}`.padStart(2, '0')}
              </Typography>
            ) : (
              <div className="verify-otp__resend-otp-container">
                <Typography className="verify-otp__not-receive-otp">
                  {translate('screens.verify-otp.not-receive-otp')}
                </Typography>
                <Typography
                  className="verify-otp__not-receive-otp verify-otp__resend-otp"
                  onClick={onResendOTPButtonClick}>
                  {translate('screens.verify-otp.resend-otp')}
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div className="verify-otp__button-container">
          <CustomButton
            buttonContainerClassName="verify-otp__button"
            buttonTextClassName="verify-otp__button-title"
            isCapitalize
            label={translate('screens.sign-up.button-title.back')}
            onClick={onOtpBackClick}
          />
          <CustomButton
            buttonContainerClassName="verify-otp__continue-button"
            isCapitalize
            isLoading={isUserAuthenticating}
            disabled={otp.length !== OTP_LENGTH}
            label={translate('screens.sign-up.button-title.confirm')}
            onClick={onConfirmClick}
          />
        </div>
      </div>
    </div>
  );
});

export default VerifyOtp;
