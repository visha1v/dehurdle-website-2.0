import { useEffect, useState } from 'react';

import { CustomButton, CustomInputField } from 'components';
import { ApiErrors, EMAIL_REGEX, ENTER, KEY_DOWN } from 'constant';
import { translate } from 'locales';
import { validateRegex } from 'utils';

import { Typography } from '@mui/material';

import './registration-styles.scss';

interface IRegistrationProps {
  email: string;
  isButtonLoading: boolean;
  isProfessionRegex: boolean;
  onBackPress: () => void;
  onChange: (email: string) => void;
  onSignUpPress: () => void;
  selectedProfession: string;
}

const Registration = (props: IRegistrationProps) => {
  const { email, isButtonLoading, onBackPress, onChange, onSignUpPress, selectedProfession } =
    props;
  const [isValidEmail, setIsValidEmail] = useState(true);
  // const currentRegex = isProfessionRegex ? PROFESSION_EMAIL_REGEX : EMAIL_REGEX;

  const onBlur = () => {
    if (email.length) {
      const isValid = validateRegex(email, EMAIL_REGEX);
      setIsValidEmail(isValid);
    }
  };

  const handleChange = (value: string) => {
    setIsValidEmail(true);
    onChange(value.replace(/\s/g, ''));
  };

  const onSignUp = () => {
    const isEmailValid = validateRegex(email, EMAIL_REGEX);
    if (isEmailValid) {
      onSignUpPress();
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === ENTER) {
        onBlur();
        onSignUp();
        event.preventDefault();
      }
    };
    document.addEventListener(KEY_DOWN, keyDownHandler);
    return () => {
      document.removeEventListener(KEY_DOWN, keyDownHandler);
    };
  }, [email, isValidEmail, onSignUp, onBlur]);

  return (
    <div className="registration__container">
      <div className="registration__sub-container">
        <div className="registration__main-container">
          {selectedProfession && (
            <Typography className="registration__title">
              {translate('screens.sign-up.registration.title')}: {selectedProfession}
            </Typography>
          )}
          <Typography className="registration__subtitle">
            {translate('screens.sign-up.registration.sub-title')}
          </Typography>
          <div className="registration__input-container">
            <CustomInputField
              errorText={!isValidEmail && translate(`content.${ApiErrors.EnterValidEmail}.message`)}
              onBlur={onBlur}
              onChange={handleChange}
              placeholder={translate('screens.sign-up.email-placeholder')}
              value={email}
            />
          </div>
          <Typography className="registration__description">
            {translate('screens.sign-up.registration.description')}
          </Typography>
        </div>
        <div className="registration__button-container">
          {/* <CustomButton
            buttonContainerClassName="registration__back-button"
            buttonTextClassName="registration__button-title"
            isCapitalize
            label={translate('screens.sign-up.button-title.back')}
            onClick={onBackPress}
          /> */}
          <CustomButton
            buttonContainerClassName="registration__button"
            disabled={!email.length || !isValidEmail}
            isCapitalize
            isLoading={isButtonLoading}
            label={translate('screens.sign-up.button-title.continue')}
            onClick={onSignUp}
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
