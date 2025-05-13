import {
  CatchYourWrecker,
  ComparerLottie,
  ConquerWreckersImage,
  DistractorLottie,
  FearfulLottie,
  GameFailureImage,
  HyperEmotionalLottie,
  OverthinkerLottie,
  PessimistLottie,
  PleaserLottie,
  ProcrastinatorLottie,
  RevealWreckerImage,
  SelfRealisation,
} from 'assets';
import { translate } from 'locales';

import { ImageAlignment } from './common-constants';

const WRECKER_CARD_DATA = [
  {
    title: translate('screens.wreckers.the-wreckers.overthinker.title'),
    description: translate('screens.wreckers.the-wreckers.overthinker.description'),
    image: OverthinkerLottie,
  },
  {
    title: translate('screens.wreckers.the-wreckers.procrastinator.title'),
    description: translate('screens.wreckers.the-wreckers.procrastinator.description'),
    image: ProcrastinatorLottie,
  },
  {
    title: translate('screens.wreckers.the-wreckers.distractor.title'),
    description: translate('screens.wreckers.the-wreckers.distractor.description'),
    image: DistractorLottie,
  },
  {
    title: translate('screens.wreckers.the-wreckers.pleaser.title'),
    description: translate('screens.wreckers.the-wreckers.pleaser.description'),
    image: PleaserLottie,
  },
  {
    title: translate('screens.wreckers.the-wreckers.pessimist.title'),
    description: translate('screens.wreckers.the-wreckers.pessimist.description'),
    image: PessimistLottie,
  },
  {
    title: translate('screens.wreckers.the-wreckers.comparer.title'),
    description: translate('screens.wreckers.the-wreckers.comparer.description'),
    image: ComparerLottie,
  },
  {
    title: translate('screens.wreckers.the-wreckers.fearful.title'),
    description: translate('screens.wreckers.the-wreckers.fearful.description'),
    image: FearfulLottie,
  },

  {
    title: translate('screens.wreckers.the-wreckers.hyper-emotional.title'),
    description: translate('screens.wreckers.the-wreckers.hyper-emotional.description'),
    image: HyperEmotionalLottie,
  },
];

const REVEAL_CONQUERER_WRECKER_DATA = [
  {
    buttonText: translate('screens.wreckers.conquer-your-wrecker.reveal-wrecker.button-text'),
    description: translate('screens.wreckers.conquer-your-wrecker.reveal-wrecker.description'),
    id: 1,
    image: RevealWreckerImage,
    summary: translate('screens.wreckers.conquer-your-wrecker.reveal-wrecker.summary'),
    title: translate('screens.wreckers.conquer-your-wrecker.reveal-wrecker.title'),
  },
  {
    buttonText: '', //translate('screens.wrecker.conquer-your-wrecker.conquer-wreckers.button-text'),
    description: translate('screens.wreckers.conquer-your-wrecker.conquer-wreckers.description'),
    id: 2,
    image: ConquerWreckersImage,
    isImageRightAligned: true,
    summary: translate('screens.wreckers.conquer-your-wrecker.conquer-wreckers.summary'),
    title: translate('screens.wreckers.conquer-your-wrecker.conquer-wreckers.title'),
  },
];

const APPROACH_STEPS = [
  {
    description: translate('screens.wreckers.approach-steps.steps.catch-your-wrecker.description'),
    description2: translate(
      'screens.wreckers.approach-steps.steps.catch-your-wrecker.description2',
    ),
    icon: CatchYourWrecker,
    id: 1,
    imageAlignment: ImageAlignment.Left,
    title: translate('screens.wreckers.approach-steps.steps.catch-your-wrecker.title'),
  },
  {
    description2: translate('screens.wreckers.approach-steps.steps.self-realisation.description2'),
    description: translate('screens.wreckers.approach-steps.steps.self-realisation.description'),
    icon: SelfRealisation,
    id: 2,
    imageAlignment: ImageAlignment.Right,
    title: translate('screens.wreckers.approach-steps.steps.self-realisation.title'),
  },
  {
    description2: translate('screens.wreckers.approach-steps.steps.grandmaster.description2'),
    description: translate('screens.wreckers.approach-steps.steps.grandmaster.description'),
    icon: GameFailureImage,
    id: 3,
    imageAlignment: ImageAlignment.Left,
    title: translate('screens.wreckers.approach-steps.steps.grandmaster.title'),
  },
];

export { WRECKER_CARD_DATA, REVEAL_CONQUERER_WRECKER_DATA, APPROACH_STEPS };
export const PROD_PDF_LINK = 'https://d3mzgu5s4gn2g6.cloudfront.net/pdfs/User+Cases.pdf';
export const DEV_PDF_LINK = 'https://d1bievj1rejqp7.cloudfront.net/pdfs/User+Cases.pdf';
