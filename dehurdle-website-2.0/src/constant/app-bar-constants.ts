import { translate } from 'locales';
import { INavItems } from 'types';

import { ROUTES } from './route-constants';

export enum DrawerPosition {
  Right = 'right',
}

export enum HeaderPosition {
  Fixed = 'fixed',
  Sticky = 'sticky',
}

export enum DrawerVariant {
  Temporary = 'temporary',
}

export const APP_BAR_BUTTON_LABEL = translate('screens.home.request-a-demo');

export const NAV_ITEMS: INavItems[] = [
  { label: translate('nav-items.home'), route: ROUTES.HOME },
  { label: translate('nav-items.science'), route: ROUTES.SCIENCE },
  { label: translate('nav-items.wreckers'), route: ROUTES.WRECKERS },
  {
    label: translate('nav-items.enterprise'),
    route: ROUTES.ENTERPRISE,
  },
  { label: translate('nav-items.about-us'), route: ROUTES.ABOUT_US },
  { label: translate('nav-items.explore'), route: ROUTES.EXPLORE },
];

export const BUTTON_LOTTIE_DIMENSION = { height: '42px', width: '210px' };
