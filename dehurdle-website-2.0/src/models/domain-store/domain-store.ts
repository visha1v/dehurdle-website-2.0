import { ApiErrors, ApiStatusCode, ApiStatusPreset, LocalStorageKeys, ToastPreset } from 'constant';
import { flow, getRoot, types } from 'mobx-state-tree';
import {
  Api,
  IAuthenticateUserPayload,
  ISubmitAuthenticationOtpPayload,
  ISubmitLeadsPayload,
  firebaseAuth,
  getFirebaseToken,
} from 'services';
import { getToastMessage, setLocalStorageValue } from 'utils';

import { RootStoreType } from '../root-store/root-store';

import { UserStore } from './user-store/user-store';
import { WreckerStore } from './wrecker-store/wrecker-store';

const DomainStore = types
  .model('DomainStore', {
    isLoggedIn: false,
    hasTakenAssessment: false,
    userStore: UserStore,
    wreckerStore: WreckerStore,
  })

  .actions(self => {
    const setIsLoggedIn = (value: boolean, saveToLocalStorage: boolean = true) => {
      self.isLoggedIn = value;
      saveToLocalStorage && setLocalStorageValue(LocalStorageKeys.IsLoggedIn, value);
    };

    const setHasTakenAssessment = (value: boolean, saveToLocalStorage: boolean = true) => {
      self.hasTakenAssessment = value;
      saveToLocalStorage && setLocalStorageValue(LocalStorageKeys.HasTakenAssessment, value);
    };

    const clearAppData = () => {
      localStorage.clear();
      setIsLoggedIn(false, false);
      setHasTakenAssessment(false, false);
      self.userStore.clearUserData();
    };

    const createUserData = flow(function* createUserData({ data }) {
      setIsLoggedIn(true);
      setHasTakenAssessment(data.has_taken_assessment);
      yield getFirebaseToken(data.custom_token);
    });

    const logoutUser = flow(function* logoutUser() {
      try {
        yield firebaseAuth.signOut();
        console.log('logout API successful');
        clearAppData();
      } catch (e) {
        console.error('logout API failed:', e);
      }
    });

    const authenticateUser = flow(function* authenticateUser(
      payload: IAuthenticateUserPayload,
      successCallback: () => void,
    ) {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore } = viewStore;
      const { setApiStatus } = apiStatusStore;
      try {
        setApiStatus({ id: ApiStatusPreset.AuthenticateUser, isLoading: true });
        const result = yield Api.authenticateUser(payload);
        console.log('authenticateUser API successful');
        if (result.status === ApiStatusCode.Success) {
          setApiStatus({ id: ApiStatusPreset.AuthenticateUser, hasFetched: true, error: null });
          self.userStore.updateUserProfileData(result.data);
          successCallback();
        } else {
          setApiStatus({ id: ApiStatusPreset.AuthenticateUser, error: result.data });
        }
      } catch (e) {
        setApiStatus({ id: ApiStatusPreset.AuthenticateUser, error: e });
        console.error('authenticateUser API failed:', e);
      } finally {
        setApiStatus({ id: ApiStatusPreset.AuthenticateUser, isLoading: false });
      }
    });

    const resendOtp = flow(function* resendOtp(payload: any, successCallback?: () => void) {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore, toastStore } = viewStore;
      const { popToast } = toastStore;
      const { setApiStatus } = apiStatusStore;
      try {
        setApiStatus({ id: ApiStatusPreset.ResendOtp, isLoading: true });
        const result = yield Api.resendOtp({
          ...payload,
          user_id: self.userStore.userId,
        });
        console.log('resendOtp API successful');
        if (result.status === ApiStatusCode.Success) {
          setApiStatus({ id: ApiStatusPreset.ResendOtp, hasFetched: true });
          !successCallback
            ? popToast({
                type: ToastPreset.Success,
                subTitle: getToastMessage(ApiErrors.OtpSent),
              })
            : successCallback();
        }
      } catch (e) {
        setApiStatus({ id: ApiStatusPreset.ResendOtp, error: e });
        console.error('resendOtp API failed:', e);
      } finally {
        setApiStatus({ id: ApiStatusPreset.ResendOtp, isLoading: false });
      }
    });

    const submitAuthenticationOtp = flow(function* submitAuthenticationOtp(
      payload: Omit<ISubmitAuthenticationOtpPayload, 'user_id'>,
      successCallback: () => void,
    ) {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore } = viewStore;
      const { setApiStatus } = apiStatusStore;
      try {
        setApiStatus({ id: ApiStatusPreset.SubmitAuthenticationOtp, isLoading: true });
        const result = yield Api.submitAuthenticationOtp({
          ...payload,
          user_id: self.userStore.userId,
        });
        if (result.status === ApiStatusCode.Success) {
          console.log('submitAuthenticationOtp API successful');
          setApiStatus({
            id: ApiStatusPreset.SubmitAuthenticationOtp,
            hasFetched: true,
            error: null,
          });
          createUserData({ data: result.data });
          successCallback();
        } else {
          setApiStatus({
            id: ApiStatusPreset.SubmitAuthenticationOtp,
            error: result.error || result.data,
          });
        }
      } catch (e) {
        setApiStatus({ id: ApiStatusPreset.SubmitAuthenticationOtp, error: e });
        console.error('submitAuthenticationOtp API failed:', e);
      } finally {
        setApiStatus({ id: ApiStatusPreset.SubmitAuthenticationOtp, isLoading: false });
      }
    });

    const submitLeads = flow(function* submitLeads(
      payload: ISubmitLeadsPayload,
      successCallback?: () => void,
    ) {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore, toastStore } = viewStore;
      const { setApiStatus } = apiStatusStore;
      const { popToast } = toastStore;

      try {
        setApiStatus({ id: ApiStatusPreset.SubmitLeads, isLoading: true });
        const result = yield Api.submitLeads(payload);
        if (result.status === ApiStatusCode.Created) {
          console.log('submitLeads API successful');
          setApiStatus({
            id: ApiStatusPreset.SubmitLeads,
            hasFetched: true,
            error: null,
          });
          popToast({ type: ToastPreset.Success, title: 'Thanks for showing your interest' });
          successCallback && successCallback();
        } else {
          setApiStatus({
            id: ApiStatusPreset.SubmitLeads,
            error: result.error || result.data,
          });
          popToast({ type: ToastPreset.Warning, title: 'Unable to record' });
        }
      } catch (e) {
        setApiStatus({ id: ApiStatusPreset.SubmitLeads, error: e });
        popToast({ type: ToastPreset.Warning, title: 'Unable to record' });
        console.error('submitLeads API failed:', e);
      } finally {
        setApiStatus({ id: ApiStatusPreset.SubmitLeads, isLoading: false });
      }
    });

    return {
      logoutUser,
      authenticateUser,
      resendOtp,
      setIsLoggedIn,
      submitLeads,
      submitAuthenticationOtp,
    };
  });

export { DomainStore };
