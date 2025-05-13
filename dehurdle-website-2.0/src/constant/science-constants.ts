import {
  CompassionImage,
  CourageImage,
  CuriosityImage,
  DailyChallengesImage,
  DehurdleExperienceImage,
  MasteryOfTheDayImage,
  NewComparerImage,
  ReflectionOfTheDayImage,
  ReminderOfTheDayImage,
} from 'assets';
import { translate } from 'locales';

import { ImageAlignment } from './common-constants';

export const SCIENCE_HERO_SECTION_DATA = {
  className: 'science',
  description: translate('screens.science.hero-section.description'),
  image: NewComparerImage,
  title: translate('screens.science.hero-section.title'),
};

const DAILY_CHALLENGES_DATA = [
  {
    description: translate('screens.science.daily-challenges.daily-challenges.description'),
    image: DailyChallengesImage,
    buttonTitle: translate('screens.science.daily-challenges.daily-challenges.button-title'),
  },
  {
    description: translate('screens.science.daily-challenges.mastery-of-the-day.description'),
    image: MasteryOfTheDayImage,
    buttonTitle: translate('screens.science.daily-challenges.mastery-of-the-day.button-title'),
  },
  {
    description: translate('screens.science.daily-challenges.dehurdle-experience.description'),
    image: DehurdleExperienceImage,
    buttonTitle: translate('screens.science.daily-challenges.dehurdle-experience.button-title'),
  },
  {
    description: translate('screens.science.daily-challenges.reminder-of-the-day.description'),
    image: ReminderOfTheDayImage,
    buttonTitle: translate('screens.science.daily-challenges.reminder-of-the-day.button-title'),
  },
  {
    description: translate('screens.science.daily-challenges.reflection-of-the-day.description'),
    image: ReflectionOfTheDayImage,
    buttonTitle: translate('screens.science.daily-challenges.reflection-of-the-day.button-title'),
  },
];

const GRAND_MASTER_CARD_DATA = [
  {
    title: translate('screens.science.grandmasters.grand-master-card.curiosity'),
    image: CuriosityImage,
    imageAlignment: ImageAlignment.Left,
  },
  {
    title: translate('screens.science.grandmasters.grand-master-card.courage'),
    image: CourageImage,
    imageAlignment: ImageAlignment.Center,
  },
  {
    title: translate('screens.science.grandmasters.grand-master-card.empathy'),
    image: CompassionImage,
    imageAlignment: ImageAlignment.Right,
  },
];

export { DAILY_CHALLENGES_DATA, GRAND_MASTER_CARD_DATA };
