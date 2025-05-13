import { ApiStatusCode, ApiStatusPreset } from 'constant';
import { flow, getRoot, types } from 'mobx-state-tree';
import { RootStoreType } from 'models';
import { Api } from 'services';

const FaqItem = types.model('FaqItem', {
  question: types.string,
  answer: types.string,
});

export type FaqItemType = typeof FaqItem.Type;

const FaqCategoryItem = types.model('FaqCategoryItem', {
  id: types.number,
  name: types.string,
});

export type FaqCategoryItemType = typeof FaqCategoryItem.Type;

const FaqStore = types
  .model('FaqStore', {
    faqAllData: types.array(FaqItem),
  })
  .actions(self => {
    const getFaqs = flow(function* getFaqs() {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore } = viewStore;

      const { setApiStatus } = apiStatusStore;
      setApiStatus({ id: ApiStatusPreset.GetFaqs, isLoading: true });
      try {
        const result = yield Api.getFaqs();
        if (result.status === ApiStatusCode.Success) {
          setApiStatus({ id: ApiStatusPreset.GetFaqs, hasFetched: true });
          self.faqAllData = result.data.data;
        }
      } catch (error) {
        setApiStatus({ id: ApiStatusPreset.GetFaqs, error });
      } finally {
        setApiStatus({ id: ApiStatusPreset.GetFaqs, isLoading: false });
      }
    });
    return { getFaqs };
  });

export { FaqStore };
