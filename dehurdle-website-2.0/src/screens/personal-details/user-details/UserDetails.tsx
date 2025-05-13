import { useEffect, useState } from 'react';

import { CustomInputField } from 'components';
import {
  ALPHABET_REGEX,
  ApiErrors,
  ApiStatusPreset,
  GENDER_OPTIONS,
  InputPreset,
  MIN_AGE,
  ToastPreset,
  USER_DETAILS_INITIAL_STATE,
  USER_DETAIL_FIELD_NAME,
  YEAR,
} from 'constant';
import dayjs from 'dayjs';
import { ScreenWrapper } from 'hoc';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import { getToastMessage } from 'utils';

import './userDetails-styles.scss';

interface IUserDetails {
  dateOfBirth: dayjs.Dayjs | null;
  firstName: string;
  gender: string;
  lastName: string;
}

interface IUserDetailsProps {
  onContinuePress: () => void;
}

const UserDetails = observer((props: IUserDetailsProps) => {
  const { onContinuePress } = props;
  const { domainStore, viewStore } = useStore();
  const { userStore } = domainStore;
  const { updateProfile } = userStore;
  const { apiStatusStore, toastStore } = viewStore;
  const { getApiStatus, setApiStatus } = apiStatusStore;
  const { popToast } = toastStore;
  const { error, isLoading } = getApiStatus(ApiStatusPreset.UpdateProfile) || {};

  const [userDetails, setUserDetails] = useState<IUserDetails>(USER_DETAILS_INITIAL_STATE);
  const [isValidUserDetails, setIsValidUserDetails] = useState({
    dateOfBirth: true,
    firstName: true,
    gender: true,
    lastName: true,
  });

  const onchange = (value: any, fieldName: string) => {
    setUserDetails(prev => ({ ...prev, [fieldName]: value }));
    setIsValidUserDetails(prev => ({ ...prev, [fieldName]: true }));
  };

  const onContinueClick = () => {
    const { dateOfBirth, firstName, gender, lastName } = userDetails;
    const age = dayjs().diff(dateOfBirth, YEAR);

    const isDateOfBirthValid = !!dateOfBirth && age >= MIN_AGE;
    const isFirstNameValid = !!firstName.trim();
    const isGenderValid = !!gender;
    const isLastNameValid = !!lastName.trim();
    const allFieldsValid = isFirstNameValid && isGenderValid && isDateOfBirthValid;

    setIsValidUserDetails({
      dateOfBirth: isDateOfBirthValid,
      firstName: isFirstNameValid,
      gender: isGenderValid,
      lastName: isLastNameValid,
    });

    const successCallback = () => {
      popToast({
        type: ToastPreset.Success,
        subTitle: getToastMessage(ApiErrors.ProfileUpdateSuccess),
      });
      onContinuePress();
    };

    if (allFieldsValid) {
      updateProfile(
        {
          date_of_birth: dateOfBirth.toISOString(),
          first_name: firstName.trim(),
          gender: gender,
          last_name: lastName.trim(),
        },
        successCallback,
      );
    }
  };

  useEffect(() => {
    if (error) {
      popToast({
        type: ToastPreset.Error,
        subTitle: getToastMessage(error.code),
      });
      setApiStatus({ id: ApiStatusPreset.UpdateProfile, error: null });
    }
  }, [error]);

  return (
    <ScreenWrapper
      buttonLabel={translate('screens.personal-details.button-label')}
      headerSubTitle={translate('screens.personal-details.sub-title')}
      headerTitle={translate('screens.personal-details.title')}
      isButtonLoading={isLoading}
      onButtonClick={onContinueClick}>
      <div className="user-details">
        <CustomInputField
          isFocus
          errorText={
            !isValidUserDetails.firstName && translate(`content.${ApiErrors.EnterName}.message`)
          }
          isRequired
          label={translate('screens.personal-details.first-name-label')}
          onChange={(value: any) => onchange(value, USER_DETAIL_FIELD_NAME.FIRST_NAME)}
          placeholder={translate('screens.personal-details.first-name-placeholder')}
          regex={ALPHABET_REGEX}
          value={userDetails.firstName}
        />
        <CustomInputField
          label={translate('screens.personal-details.last-name-label')}
          onChange={(value: any) => onchange(value, USER_DETAIL_FIELD_NAME.LAST_NAME)}
          placeholder={translate('screens.personal-details.last-name-placeholder')}
          regex={ALPHABET_REGEX}
          value={userDetails.lastName}
        />
        <CustomInputField
          errorText={
            !isValidUserDetails.gender && translate(`content.${ApiErrors.SelectGender}.message`)
          }
          isRequired
          label={translate('screens.personal-details.gender-label')}
          onChange={(value: any) => onchange(value, USER_DETAIL_FIELD_NAME.GENDER)}
          options={GENDER_OPTIONS}
          placeholder={translate('screens.personal-details.gender-placeholder')}
          type={InputPreset.Dropdown}
          value={userDetails.gender}
          dropdownModalTitle={translate('screens.personal-details.select-gender')}
          dropdownModalButtonLabel={translate('common.done')}
        />
        <CustomInputField
          errorText={
            !isValidUserDetails.dateOfBirth && translate(`content.${ApiErrors.SelectDob}.message`)
          }
          isRequired
          label={translate('screens.personal-details.dob-label')}
          onChange={(value: any) => onchange(value, USER_DETAIL_FIELD_NAME.DATE_OF_BIRTH)}
          placeholder={translate('screens.personal-details.dob-placeholder')}
          type={InputPreset.Date}
          value={userDetails.dateOfBirth}
          maxDate={dayjs().subtract(18, YEAR)}
        />
      </div>
    </ScreenWrapper>
  );
});

export default UserDetails;
