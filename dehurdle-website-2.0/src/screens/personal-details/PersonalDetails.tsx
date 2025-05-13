import { useState } from 'react';

import { LocalStorageKeys } from 'constant';
import { getLocalStorageValue, setLocalStorageValue } from 'utils';

import AccountCreated from './account-created/AccountCreated';
import UserDetails from './user-details/UserDetails';

const PersonalDetails = () => {
  const [isUserDetailsFlow, setIsUserDetailsFlow] = useState(true);

  const onContinuePress = () => {
    setIsUserDetailsFlow(false);
    setLocalStorageValue(LocalStorageKeys.IsAccountCreated, true);
  };

  const isAccountCreated = getLocalStorageValue(LocalStorageKeys.IsAccountCreated);

  return !isAccountCreated && isUserDetailsFlow ? (
    <UserDetails onContinuePress={onContinuePress} />
  ) : (
    <AccountCreated />
  );
};

export default PersonalDetails;
