import { ApiStatusCode, ApiStatusPreset, LocalStorageKeys } from 'constant';
import { flow, getRoot, types } from 'mobx-state-tree';
import { Api } from 'services';
import { convertKeysToCamelCase, setLocalStorageValue } from 'utils';

import { RootStoreType } from '../../root-store/root-store';

const ConfigStore = types
  .model('ConfigStore', {
    assessmentCompletionTime: types.string,
    scoreProgressColors: types.array(types.string),
    professions: types.array(types.string),
  })
  .actions(self => ({
    getConfig: flow(function* getConfig() {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore } = viewStore;
      const { setApiStatus } = apiStatusStore;

      try {
        setApiStatus({ id: ApiStatusPreset.AppConfig, isLoading: true });
        const result = yield Api.getConfig();
        console.log('getConfig API successful');

        if (result.status === ApiStatusCode.Success) {
          setApiStatus({ id: ApiStatusPreset.AppConfig, hasFetched: true });
          const singleObject = result?.data?.data.reduce((acc, item) => {
            acc[item.key] = item.value ? item.value : item.options_json;
            return acc;
          }, {});

          const data = convertKeysToCamelCase(singleObject);
          self.assessmentCompletionTime = data.assessmentCompletionTime;
          self.scoreProgressColors = data.scoreProgressColors;
          self.professions = data.professions;
          setLocalStorageValue(LocalStorageKeys.ConfigData, {
            assessmentCompletionTime: data.assessmentCompletionTime,
            professions: data.professions,
            scoreProgressColors: data.scoreProgressColors,
          });
        }
      } catch (error) {
        setApiStatus({ id: ApiStatusPreset.AppConfig, error });
        console.error('getConfig API failed :', error);
      } finally {
        setApiStatus({ id: ApiStatusPreset.AppConfig, isLoading: false });
      }
    }),
  }));

export { ConfigStore };
