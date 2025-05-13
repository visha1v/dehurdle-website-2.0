import { CheckIcon, ErrorIcon, WarningIcon } from 'assets';
import palette from 'theme/colors';

export enum ToastPreset {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

export const TOAST_PRESET: any = {
  [ToastPreset.Success]: {
    Icon: CheckIcon,
    backgroundColor: palette.mintCream,
    borderColor: palette.silverTree,
  },
  [ToastPreset.Error]: {
    Icon: ErrorIcon,
    backgroundColor: palette.whiteSmoke,
    borderColor: palette.burntSienna,
  },
  [ToastPreset.Warning]: {
    Icon: WarningIcon,
    backgroundColor: palette.whiteFloral,
    borderColor: palette.festival,
  },
};
