import { ApiStatusCode, ApiStatusPreset } from 'constant';
import { applySnapshot, flow, getRoot, types } from 'mobx-state-tree';
import { RootStoreType } from 'models';
import { Api } from 'services';
import { convertKeysToCamelCase } from 'utils';

const UserStore = types
  .model('UserStore', {
    dateOfBirth: types.string,
    email: types.string,
    fullName: types.string,
    gender: types.string, // MALE, FEMALE
    isNotificationSettingsEnabled: true,
    phoneNumber: types.string,
    userId: types.maybeNull(types.number),
  })
  .volatile(() => ({}))
  .actions(self => {
    const clearUserData = () => {
      self.dateOfBirth = '';
      self.email = '';
      self.fullName = '';
      self.gender = '';
      self.phoneNumber = '';
      self.userId = null;
    };

    const updateUserProfileData = (data: any) => {
      const userData = convertKeysToCamelCase(data);
      const snapshot = {
        dateOfBirth: userData?.dateOfBirth || self.dateOfBirth,
        email: userData?.email || self.email,
        fullName: userData?.fullName || self.fullName,
        gender: userData?.gender || self.gender,
        isNotificationSettingsEnabled: !!userData?.isNotificationSettingsEnabled,
        phoneNumber: userData?.phoneNumber || self.phoneNumber,
        userId: userData?.id || userData?.userId || self.userId,
      };
      applySnapshot(self, snapshot);
    };

    const updateProfile = flow(function* updateProfile(payload, successCallback?: () => void) {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore } = viewStore;

      const { setApiStatus } = apiStatusStore;
      try {
        setApiStatus({ id: ApiStatusPreset.UpdateProfile, isLoading: true, error: null });

        const result = yield Api.updateUser(payload);
        console.log('updateProfile API completed successfully');

        if (result.status === ApiStatusCode.NoContent) {
          setApiStatus({ id: ApiStatusPreset.UpdateProfile, hasFetched: true });
          successCallback && successCallback();
        } else {
          setApiStatus({ id: ApiStatusPreset.UpdateProfile, hasFetched: true, error: result.data });
        }
      } catch (error) {
        setApiStatus({ id: ApiStatusPreset.UpdateProfile, error });
        console.error(`updateProfile API failed: ${error}`);
      } finally {
        setApiStatus({ id: ApiStatusPreset.UpdateProfile, isLoading: false });
      }
    });

    return {
      clearUserData,
      updateProfile,
      updateUserProfileData,
    };
  });

export { UserStore };
