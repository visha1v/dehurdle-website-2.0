import { Instance } from 'mobx-state-tree';

import ToastStore from './toast-store';

export { ToastStore };

export type ToastStoreType = Instance<typeof ToastStore>;
