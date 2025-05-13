import { Instance } from 'mobx-state-tree';

import ApiStatusStore from './api-status-store';

export { ApiStatusStore };

export type ApiStatusStoreType = Instance<typeof ApiStatusStore>;
