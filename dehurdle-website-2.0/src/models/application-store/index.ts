import { Instance } from 'mobx-state-tree';

import { ApplicationStore } from './application-store';
import { ApplicationStoreData } from './applicationStoreData';

export * from './faq-store/faq-store';

export { ApplicationStore, ApplicationStoreData };

export type ApplicationStoreType = Instance<typeof ApplicationStore>;
