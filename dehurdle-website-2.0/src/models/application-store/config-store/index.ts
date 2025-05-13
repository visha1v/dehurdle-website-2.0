import { Instance } from 'mobx-state-tree';

import { ConfigStore } from './config-store';

export { ConfigStore };

export type ConfigStoreType = Instance<typeof ConfigStore>;
