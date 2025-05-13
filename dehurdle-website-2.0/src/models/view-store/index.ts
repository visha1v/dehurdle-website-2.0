import { Instance } from 'mobx-state-tree';

import { ViewStore } from './view-store';
import { ViewStoreData } from './viewStoreData';

export { ViewStore, ViewStoreData };

export type ViewStoreType = Instance<typeof ViewStore>;
