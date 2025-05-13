import { AmitImage, ConquerWreckersImage, JakeBirdImage, ThinkingImage } from 'assets';
import { translate } from 'locales';

export const FOUNDER_CARD_DATA = [
  {
    className: 'dehurdle-founder__sub-container',
    description: translate('screens.about-us.dehurdle-founder.founder-one.description'),
    image: AmitImage,
    key: 1,
    title: translate('screens.about-us.dehurdle-founder.founder-one.title'),
  },
  // {
  //   className: 'dehurdle-founder__sub-container dehurdle-founder__sub-container-reverse',
  //   description: translate('screens.about-us.dehurdle-founder.founder-two.description'),
  //   image: PrakharImage,
  //   key: 2,
  //   title: translate('screens.about-us.dehurdle-founder.founder-two.title'),
  // },
];

export const DEHURDLE_SPECIALITY = [
  {
    id: 1,
    image: ConquerWreckersImage,
    title: translate('screens.about-us.dehurdle-speciality.conquer-wreckers.title'),
    description: translate('screens.about-us.dehurdle-speciality.conquer-wreckers.description'),
  },
  {
    id: 2,
    image: JakeBirdImage,
    imageClassName: 'featureCard__secondary-image',
    title: translate('screens.about-us.dehurdle-speciality.our-philosophy.title'),
    isImageRightAligned: true,
    description: translate('screens.about-us.dehurdle-speciality.our-philosophy.description'),
  },
];

export const ABOUT_US_HERO_SECTION_DATA = {
  className: 'row-reverse',
  description: translate('screens.about-us.hero-section.description'),
  image: ThinkingImage,
  title: translate('screens.about-us.hero-section.title'),
  imageClassName: 'about-us__image',
};

export const FOUNDER_WEBSITE_LINK = 'https://amitkasliwal.in/';
