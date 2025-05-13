import { ApiStatusCode, ApiStatusPreset } from 'constant';
import { flow, getRoot, types } from 'mobx-state-tree';
import { Api, ISubmitSubscriptionEmailPayload } from 'services';

import { RootStoreType } from '../root-store/root-store';

import { ConfigStore } from './config-store';
import { FaqStore } from './faq-store/faq-store';

const ApplicationStore = types
  .model('ApplicationStore', {
    configStore: ConfigStore,
    faqStore: FaqStore,
  })
  .actions(self => {
    const submitSubscriptionEmail = flow(function* submitSubscriptionEmail(
      payload: ISubmitSubscriptionEmailPayload,
      successCallback: () => void,
    ) {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore } = viewStore;
      const { setApiStatus } = apiStatusStore;
      try {
        setApiStatus({
          id: ApiStatusPreset.SubmitSubscriptionEmail,
          isLoading: true,
        });
        const result = yield Api.submitSubscriptionEmail(payload);
        if (result.status === ApiStatusCode.Created) {
          console.log('SubmitSubscriptionEmail API successful');
          setApiStatus({
            id: ApiStatusPreset.SubmitSubscriptionEmail,
            hasFetched: true,
            error: null,
          });
          successCallback();
        } else {
          setApiStatus({
            id: ApiStatusPreset.SubmitSubscriptionEmail,
            error: result.data,
          });
        }
      } catch (e) {
        setApiStatus({ id: ApiStatusPreset.SubmitSubscriptionEmail, error: e });
        console.error('SubmitSubscriptionEmail API failed:', e);
      } finally {
        setApiStatus({
          id: ApiStatusPreset.SubmitSubscriptionEmail,
          isLoading: false,
        });
      }
    });
    return { submitSubscriptionEmail };
  });

export { ApplicationStore };
