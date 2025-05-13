import {
  AccentureIcon,
  AdityaBirlaLogo,
  AgodaLogo,
  AmericanExpressLogo,
  AvanseLogo,
  AvivaLogo,
  AxisBankLogo,
  BhartiAxaLogo,
  BoostedPerformanceIcon,
  ConfederationOfIndiaLogo,
  DanikJagranLogo,
  DeloitteIcon,
  EXLLogo,
  EnterpriseSolutionImage,
  FluorLogo,
  Ford,
  FourthPartnerEnergyLogo,
  GMRGroupLogo,
  GrowthMeasurement,
  HarmanLogo,
  HitachiRailLogo,
  InfosysLogo,
  InitialAssessment,
  IonExchangeLogo,
  JKCementLogo,
  JioLogo,
  KotakMahindraLogo,
  MavericksLogo,
  NewlyWedsLogo,
  NissanLogo,
  NothingIcon,
  PannasonicLogo,
  PersonalizedJourney,
  QuessLogo,
  RelianceIndustriesLogo,
  ReturnOnInvestmentIcon,
  SennheiserLogo,
  TCSImage,
  TajLogo,
  TangibleChangeIcon,
  TataAiaLogo,
  TedxLogo,
  UltraTechLogo,
  WPPLogo,
  WaghBakriLogo,
  alstomLogo,
} from 'assets';
import { translate } from 'locales';
import palette from 'theme/colors';

import { ImageAlignment } from './common-constants';

const ENTERPRISE_HERO_SECTION_DATA = {
  className: 'enterprise',
  description: translate('screens.enterprise.session.hero-section.description'),
  disclaimer: translate('screens.enterprise.session.hero-section.disclaimer'),
  image: EnterpriseSolutionImage,
  imageClassName: 'enterprise-session__image',
  title: translate('screens.enterprise.session.hero-section.title'),
};

const DEHURDLE_WORKING_DATA = [
  {
    id: 1,
    image: InitialAssessment,
    title: translate('screens.enterprise.session.dehurdle-working.initial-assessment.title'),
    description: translate(
      'screens.enterprise.session.dehurdle-working.initial-assessment.description',
    ),
    imageAlignment: ImageAlignment.Left,
  },
  {
    id: 2,
    image: PersonalizedJourney,
    title: translate('screens.enterprise.session.dehurdle-working.personalized-journey.title'),
    description: translate(
      'screens.enterprise.session.dehurdle-working.personalized-journey.description',
    ),
    imageAlignment: ImageAlignment.Right,
  },
  {
    id: 3,
    image: GrowthMeasurement,
    title: translate('screens.enterprise.session.dehurdle-working.growth-measurement.title'),
    description: translate(
      'screens.enterprise.session.dehurdle-working.growth-measurement.description',
    ),
    imageAlignment: ImageAlignment.Left,
  },
];

const USER_TESTIMONIALS_DATA = [
  {
    backgroundColor: palette.placeboYellow,
    className: 'enterprise-session-section-7__tcs-icon',
    companyImage: TCSImage,
    designation: translate('screens.enterprise.session.user-testimonials.tcs.designation'),
    id: 1,
    name: translate('screens.enterprise.session.user-testimonials.tcs.name'),
    testimonial: translate('screens.enterprise.session.user-testimonials.tcs.testimonial'),
  },
  {
    backgroundColor: palette.lavenderBlush,
    className: 'enterprise-session-section-7__deloitte-icon',
    companyLogo: DeloitteIcon,
    designation: translate('screens.enterprise.session.user-testimonials.deloitte.designation'),
    id: 2,
    name: translate('screens.enterprise.session.user-testimonials.deloitte.name'),
    testimonial: translate('screens.enterprise.session.user-testimonials.deloitte.testimonial'),
  },
  {
    backgroundColor: palette.distantHorizonLight,
    className: 'enterprise-session-section-7__nothing-icon',
    companyLogo: DeloitteIcon,
    designation: translate('screens.enterprise.session.user-testimonials.nothing.designation'),
    id: 3,
    name: translate('screens.enterprise.session.user-testimonials.nothing.name'),
    testimonial: translate('screens.enterprise.session.user-testimonials.nothing.testimonial'),
  },
  {
    backgroundColor: palette.distantHorizon,
    className: 'enterprise-session-section-7__accenture-icon',
    companyLogo: AccentureIcon,
    designation: translate('screens.enterprise.session.user-testimonials.accenture.designation'),
    id: 4,
    name: translate('screens.enterprise.session.user-testimonials.accenture.name'),
    testimonial: translate('screens.enterprise.session.user-testimonials.accenture.testimonial'),
  },
];

enum DifferenceCardType {
  Default = 'Default',
  Card = 'Card',
}

const DEHURDLE_DIFFERENCE_DATA = [
  {
    backgroundColor: palette.lavenderBlush,
    id: 1,
    title: translate('screens.enterprise.session.dehurdle-difference.first-card.title'),
    titleColor: palette.raspberryPink,
    type: DifferenceCardType.Default,
  },
  {
    backgroundColor: palette.placeboYellow,
    description: translate(
      'screens.enterprise.session.dehurdle-difference.second-card.description',
    ),
    icon: BoostedPerformanceIcon,
    id: 2,
    title: translate('screens.enterprise.session.dehurdle-difference.second-card.title'),
    titleColor: palette.tangerine,
    type: DifferenceCardType.Card,
  },
  {
    backgroundColor: palette.distantHorizon,
    description: translate('screens.enterprise.session.dehurdle-difference.third-card.description'),
    icon: TangibleChangeIcon,
    id: 3,
    title: translate('screens.enterprise.session.dehurdle-difference.third-card.title'),
    titleColor: palette.darkCyan,
    type: DifferenceCardType.Card,
  },
  {
    backgroundColor: palette.distantHorizonLight,
    description: translate(
      'screens.enterprise.session.dehurdle-difference.fourth-card.description',
    ),
    icon: ReturnOnInvestmentIcon,
    id: 4,
    title: translate('screens.enterprise.session.dehurdle-difference.fourth-card.title'),
    titleColor: palette.cornflowerBlue,
    type: DifferenceCardType.Card,
  },
];

const MAKERS_TESTIMONIALS = [
  // {
  //   description: translate('screens.enterprise.session.decision-maker-testimonials.first-testimonial.description'),
  //   key: 1,
  //   title: translate('screens.enterprise.session.decision-maker-testimonials.first-testimonial.title'),
  // },
  {
    description: translate(
      'screens.enterprise.session.decision-maker-testimonials.second-testimonial.description',
    ),
    key: 2,
    title: translate(
      'screens.enterprise.session.decision-maker-testimonials.second-testimonial.title',
    ),
  },
  {
    description: translate(
      'screens.enterprise.session.decision-maker-testimonials.third-testimonial.description',
    ),
    key: 3,
    title: translate(
      'screens.enterprise.session.decision-maker-testimonials.third-testimonial.title',
    ),
  },
  // {
  //   description: translate('screens.enterprise.session.decision-maker-testimonials.fourth-testimonial.description'),
  //   key: 4,
  //   title: translate('screens.enterprise.session.decision-maker-testimonials.fourth-testimonial.title'),
  // },
  // {
  //   description: translate('screens.enterprise.session.decision-maker-testimonials.fifth-testimonial.description'),
  //   key: 5,
  //   title: translate('screens.enterprise.session.decision-maker-testimonials.fifth-testimonial.title'),
  // },
];

export type UserTestimonialsDataType = typeof USER_TESTIMONIALS_DATA;

const LOGOS = [
  AdityaBirlaLogo,
  AgodaLogo,
  alstomLogo,
  AmericanExpressLogo,
  AvanseLogo,
  AvivaLogo,
  AxisBankLogo,
  BhartiAxaLogo,
  ConfederationOfIndiaLogo,
  DanikJagranLogo,
  EXLLogo,
  FluorLogo,
  Ford,
  FourthPartnerEnergyLogo,
  GMRGroupLogo,
  HarmanLogo,
  HitachiRailLogo,
  InfosysLogo,
  IonExchangeLogo,
  JioLogo,
  JKCementLogo,
  KotakMahindraLogo,
  MavericksLogo,
  NewlyWedsLogo,
  NissanLogo,
  PannasonicLogo,
  QuessLogo,
  RelianceIndustriesLogo,
  SennheiserLogo,
  TajLogo,
  TataAiaLogo,
  TedxLogo,
  UltraTechLogo,
  WaghBakriLogo,
  WPPLogo,
];

export {
  ENTERPRISE_HERO_SECTION_DATA,
  LOGOS,
  MAKERS_TESTIMONIALS,
  DEHURDLE_WORKING_DATA,
  DEHURDLE_DIFFERENCE_DATA,
  DifferenceCardType,
  USER_TESTIMONIALS_DATA,
};
