import { LetsConnectImage } from 'assets';
import { translate } from 'locales';

export const REQUEST_DEMO_HERO_SECTION_DATA = {
  className: 'request-demo',
  description: '',
  image: LetsConnectImage,
  imageContainerClassName: 'request-demo-image-container',
  title: translate('screens.demo.hero-section.title'),
  titleClassName: 'request-demo-title',
};

export const WHAT_TO_EXPECT_CARD_DATA = [
  {
    description: translate('screens.demo.what-to-expect.card1.description'),
    title: translate('screens.demo.what-to-expect.card1.title'),
  },
  {
    description: translate('screens.demo.what-to-expect.card2.description'),
    title: translate('screens.demo.what-to-expect.card2.title'),
  },
  {
    description: translate('screens.demo.what-to-expect.card3.description'),
    title: translate('screens.demo.what-to-expect.card3.title'),
  },
  {
    description: translate('screens.demo.what-to-expect.card4.description'),
    title: translate('screens.demo.what-to-expect.card4.title'),
  },
  {
    description: translate('screens.demo.what-to-expect.card5.description'),
    title: translate('screens.demo.what-to-expect.card5.title'),
  },
  {
    description: translate('screens.demo.what-to-expect.card6.description'),
    title: translate('screens.demo.what-to-expect.card6.title'),
  },
];

export const COMPANY_SIZE_OPTIONS = [
  translate('screens.demo.request-demo-form.companySizeOptions.1_50'),
  translate('screens.demo.request-demo-form.companySizeOptions.51_200'),
  translate('screens.demo.request-demo-form.companySizeOptions.201_500'),
  translate('screens.demo.request-demo-form.companySizeOptions.501_1000'),
  translate('screens.demo.request-demo-form.companySizeOptions.1000_plus'),
];

export const YOUR_QUERY_OPTIONS = [
  translate('screens.demo.request-demo-form.yourQueryOptions.demo'),
  translate('screens.demo.request-demo-form.yourQueryOptions.coaching'),
  translate('screens.demo.request-demo-form.yourQueryOptions.partnership'),
];

export const HEARD_FROM_OPTIONS = [
  translate('screens.demo.request-demo-form.heardFromOptions.google'),
  translate('screens.demo.request-demo-form.heardFromOptions.social'),
  translate('screens.demo.request-demo-form.heardFromOptions.website'),
  translate('screens.demo.request-demo-form.heardFromOptions.ad'),
  translate('screens.demo.request-demo-form.heardFromOptions.referral'),
  translate('screens.demo.request-demo-form.heardFromOptions.other'),
];

export enum RequestDemoFieldPreset {
  companyName = 'companyName',
  companySize = 'companySize',
  designation = 'designation',
  email = 'email',
  firstName = 'firstName',
  heardFrom = 'heardFrom',
  lastName = 'lastName',
  mobileNumber = 'mobileNumber',
  yourQuery = 'yourQuery',
}

export const MAX_LENGTHS: Record<string, number> = {
  [RequestDemoFieldPreset.companyName]: 1000,
  [RequestDemoFieldPreset.designation]: 1000,
  [RequestDemoFieldPreset.firstName]: 255,
  [RequestDemoFieldPreset.lastName]: 255,
  [RequestDemoFieldPreset.mobileNumber]: 10,
};

export const REQUEST_DEMO_FORM_VALUE = {
  [RequestDemoFieldPreset.companyName]: '',
  [RequestDemoFieldPreset.companySize]: '',
  [RequestDemoFieldPreset.designation]: '',
  [RequestDemoFieldPreset.email]: '',
  [RequestDemoFieldPreset.firstName]: '',
  [RequestDemoFieldPreset.heardFrom]: '',
  [RequestDemoFieldPreset.lastName]: '',
  [RequestDemoFieldPreset.mobileNumber]: '',
  [RequestDemoFieldPreset.yourQuery]: '',
};

export const REQUEST_DEMO_ERROR_VALUE = {
  [RequestDemoFieldPreset.companyName]: false,
  [RequestDemoFieldPreset.companySize]: false,
  [RequestDemoFieldPreset.designation]: false,
  [RequestDemoFieldPreset.email]: false,
  [RequestDemoFieldPreset.firstName]: false,
  [RequestDemoFieldPreset.heardFrom]: false,
  [RequestDemoFieldPreset.lastName]: false,
  [RequestDemoFieldPreset.mobileNumber]: false,
  [RequestDemoFieldPreset.yourQuery]: false,
};
