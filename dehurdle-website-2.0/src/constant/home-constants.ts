import {
  CelebrationImage,
  ConnectionsImage,
  DeliverImage,
  DeliverMobileImage,
  DetectImage,
  DetectMobileImage,
  DiagnoseImage,
  DiagnoseMobileImage,
  PerformanceImage,
  TrackProgressImage,
  TrackProgressMobileImage,
} from 'assets';
import { translate } from 'locales';
import palette from 'theme/colors';

import { IHomeCardPreset } from './common-constants';

const isMobile = window.innerWidth < 600;

const CARDS_DATA = [
  {
    className: 'challenge-compass__card',
    color: palette.lavenderBlush,
    description: translate('screens.home.challenge-compass.cards.card-1.description'),
    image: isMobile ? DetectMobileImage : DetectImage,
    number: 1,
    numberColor: palette.classicRose,
    preset: IHomeCardPreset.Primary,
    title: translate('screens.home.challenge-compass.cards.card-1.title'),
  },
  {
    className: 'challenge-compass__card',
    color: palette.distantHorizon,
    description: translate('screens.home.challenge-compass.cards.card-2.description'),
    image: isMobile ? DiagnoseMobileImage : DiagnoseImage,
    number: 2,
    numberColor: palette.freezyBreezy,
    title: translate('screens.home.challenge-compass.cards.card-2.title'),
  },
  {
    className: 'challenge-compass__card',
    color: palette.placeboYellow,
    description: translate('screens.home.challenge-compass.cards.card-3.description'),
    image: isMobile ? DeliverMobileImage : DeliverImage,
    number: 3,
    numberColor: palette.gingerLemonCake,
    title: translate('screens.home.challenge-compass.cards.card-3.title'),
  },
  {
    className: 'challenge-compass__card',
    color: palette.distantHorizonLight,
    description: translate('screens.home.challenge-compass.cards.card-4.description'),
    image: isMobile ? TrackProgressMobileImage : TrackProgressImage,
    number: 4,
    numberColor: palette.blueEffervescence,
    title: translate('screens.home.challenge-compass.cards.card-4.title'),
  },
];

const OVERVIEW_CARD_DATA = [
  {
    className: 'overview__card',
    description: translate('screens.home.overview.overview-card.performance-description'),
    icon: PerformanceImage,
    title: translate('screens.home.overview.overview-card.performance-title'),
  },
  {
    className: 'overview__card',
    description: translate('screens.home.overview.overview-card.wellness-description'),
    icon: CelebrationImage,
    title: translate('screens.home.overview.overview-card.wellness-title'),
  },
  {
    className: 'overview__card',
    description: translate('screens.home.overview.overview-card.connection-description'),
    icon: ConnectionsImage,
    title: translate('screens.home.overview.overview-card.connection-title'),
  },
];

const geHomeLottieSize = (isMobile: boolean, isTablet: boolean) => {
  switch (true) {
    case isMobile:
      return { height: '244px', width: '246px' };
    case isTablet:
      return { height: '100%', width: '100%' };
    default:
      return { height: '100%', width: '100%' };
  }
};

export { CARDS_DATA, OVERVIEW_CARD_DATA, geHomeLottieSize };
