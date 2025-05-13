import { types } from 'mobx-state-tree';

import { ApiStatusStore } from './api-status';
import { ToastStore } from './toast-store';

const ViewStore = types.model('ViewStore', {
  apiStatusStore: ApiStatusStore,
  toastStore: ToastStore,
});

export { ViewStore };
