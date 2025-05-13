import { types } from 'mobx-state-tree';

export const ApiConstantStore = types.model('ApiConstantStore', {
  error: types.maybeNull(types.frozen()),
  hasFetched: types.boolean,
  id: types.identifier,
  isError: types.boolean,
  isLoading: types.boolean,
});

const ApiStatusStore = types
  .model('ApiStatusStore', {
    apiStatus: types.map(ApiConstantStore),
  })
  .actions(self => {
    const setApiStatus = (data: {
      error?: any;
      hasFetched?: boolean;
      id: string;
      isError?: boolean;
      isLoading?: boolean;
    }) => {
      const previousData = self.apiStatus.get(data.id);
      const {
        id,
        error = previousData?.error || null,
        hasFetched = previousData?.hasFetched || false,
        isError = previousData?.isError || false,
        isLoading = previousData?.isLoading || false,
      } = data;
      self.apiStatus.set(id, {
        id,
        error,
        hasFetched,
        isError,
        isLoading,
      });
    };

    const getApiStatus = (id: string) => {
      if (self.apiStatus.get(id)) {
        return self.apiStatus.get(id);
      } else {
        const data = {
          error: null,
          hasFetched: false,
          id,
          isError: false,
          isLoading: false,
        };
        setApiStatus(data);
        return self.apiStatus.get(id);
      }
    };

    const clearApiStatus = () => {
      self.apiStatus.clear();
    };

    return { clearApiStatus, getApiStatus, setApiStatus };
  });

export default ApiStatusStore;
