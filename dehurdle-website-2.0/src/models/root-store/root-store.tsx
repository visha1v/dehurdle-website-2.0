import { ReactNode, createContext, useContext } from 'react';

import { Instance, types } from 'mobx-state-tree';

import { ApplicationStore, ApplicationStoreData } from '../application-store';
import { DomainStore, DomainStoreData } from '../domain-store';
import { ViewStore, ViewStoreData } from '../view-store';

const RootStore = types.model('RootStore', {
  applicationStore: ApplicationStore,
  domainStore: DomainStore,
  viewStore: ViewStore,
});

function createStore() {
  const applicationStore = ApplicationStore.create(ApplicationStoreData);
  const domainStore = DomainStore.create(DomainStoreData);
  const viewStore = ViewStore.create(ViewStoreData);

  const store = RootStore.create({
    applicationStore,
    domainStore,
    viewStore,
  });

  return store;
}

const mstStore = createStore();

export type RootStoreType = Instance<typeof RootStore>;

export { RootStore, mstStore };

export const MSTStoreContext = createContext(mstStore);

export const useStore = () => {
  const mstStore = useContext(MSTStoreContext);
  return mstStore;
};

export const MSTStoreProvider = ({ children }: { children: ReactNode }) => {
  return <MSTStoreContext.Provider value={mstStore}>{children}</MSTStoreContext.Provider>;
};
