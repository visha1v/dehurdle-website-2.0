import { TOAST_DURATION, ToastPreset } from 'constant';
import { types } from 'mobx-state-tree';

let timeout: any;

const TOAST_ANIMATION_DURATION = TOAST_DURATION + 500;

const ToastStore = types
  .model('ToastStore', {
    isToastVisible: types.boolean,
    toastTitle: types.string,
    toastSubTitle: types.string,
    preset: types.enumeration([ToastPreset.Success, ToastPreset.Error, ToastPreset.Warning]),
  })
  .actions(self => ({
    closeToast() {
      clearTimeout(timeout);
      self.isToastVisible = false;
    },

    popToast({
      type,
      title = '',
      subTitle = '',
    }: {
      type: ToastPreset;
      title?: string;
      subTitle?: string;
    }) {
      self.preset = type;
      self.isToastVisible = true;
      self.toastTitle = title;
      self.toastSubTitle = subTitle;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        self.closeToast();
      }, TOAST_ANIMATION_DURATION);
    },
  }));

export default ToastStore;
