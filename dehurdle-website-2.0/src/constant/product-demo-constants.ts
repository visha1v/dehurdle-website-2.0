import {
  BuddiesImage,
  DigitDanceBackgroundImage,
  DissatisfiedIcon,
  FeedImage,
  FilledDissatisfiedIcon,
  FilledHighlyDissatisfiedIcon,
  FilledHighlySatisfiedIcon,
  FilledNeutralIcon,
  FilledSatisfiedIcon,
  HighlyDissatisfiedIcon,
  HighlySatisfiedIcon,
  LeaderBoardImage,
  MasteryCardBackgroundImage,
  MeditationBackgroundImage,
  NeutralIcon,
  PauseIcon,
  PlayIcon,
  RecordIcon,
  SatisfiedIcon,
} from 'assets';
import { translate } from 'locales';
import palette from 'theme/colors';
import spacing from 'theme/spacing';
import { ChallengesPreset, MasteryGamesPreset, ReflectionStatePreset } from 'types';

export enum AudioScreenPreset {
  Intro = 'Intro',
  Result = 'Result',
}

export enum ActivityType {
  Game = 'Game',
  Audio = 'Audio',
}

export enum GameState {
  Intro = 'Intro',
  Outcome = 'Outcome',
  Playing = 'Playing',
  Result = 'Result',
}

export enum GameType {
  SHAPE_SPOTTING = 'SHAPE_SPOTTING',
  STORY_TELLING = 'STORY_TELLING',
}

export enum RATING {
  DISSATISFIED = 'DISSATISFIED',
  HIGHLY_DISSATISFIED = 'HIGHLY_DISSATISFIED',
  HIGHLY_SATISFIED = 'HIGHLY_SATISFIED',
  NEUTRAL = 'NEUTRAL',
  SATISFIED = 'SATISFIED',
}

enum AgreementOptions {
  Yes = 'YES',
  Maybe = 'MAYBE',
  No = 'NO',
}

export enum ResultStatus {
  Lose = 'LOSE',
  Win = 'WIN',
}

export const DEMO_VIDEO_LINK = `${import.meta.env.VITE_APP_AWS_S3_PATH}Dehurdle_walkthrough.mp4`;
export const MASTERY_AUDIO_LINK = `${import.meta.env.VITE_APP_AWS_S3_PATH}Mastery_of_the_day.mp3`;
export const MEDITATION_AUDIO_LINK = `${import.meta.env.VITE_APP_AWS_S3_PATH}Meditation_of_the_day.mp3`;
export const RECORDING_ALLOWED_SECONDS = 300;
export const WAVE_FORM_STYLE = {
  height: spacing.Spacing_60,
  width: spacing.Spacing_96,
};

export const MASTERY_BREAKPOINTS = [
  {
    seconds: 141,
    preset: MasteryGamesPreset.MatchColumns,
  },
  {
    seconds: 160,
    preset: MasteryGamesPreset.SelectStatement,
  },
];

export const GAMIFICATION_CARD_DATA = [
  {
    background: palette.lavenderBlush,
    description: translate('screens.product-demo.gamification.card.leaderboard-description'),
    headerColor: palette.raspberryPink,
    id: 1,
    image: LeaderBoardImage,
    title: translate('screens.product-demo.gamification.card.leaderboard-title'),
  },
  {
    background: palette.placeboYellow,
    description: translate('screens.product-demo.gamification.card.buddies-description'),
    headerColor: palette.tenne,
    id: 2,
    image: BuddiesImage,
    title: translate('screens.product-demo.gamification.card.buddies-title'),
  },
  {
    background: palette.distantHorizon,
    description: translate('screens.product-demo.gamification.card.feed-description'),
    headerColor: palette.greenCyan,
    id: 3,
    image: FeedImage,
    title: translate('screens.product-demo.gamification.card.feed-title'),
  },
];

export const CHALLENGES_BACKGROUND_IMAGE: { [key: string]: string } = {
  [ChallengesPreset.Mastery]: MasteryCardBackgroundImage,
  [ChallengesPreset.ShapeHunt]: DigitDanceBackgroundImage,
  [ChallengesPreset.Meditation]: MeditationBackgroundImage,
  [ChallengesPreset.SpinAStory]: DigitDanceBackgroundImage,
  [ChallengesPreset.Reflection]: MasteryCardBackgroundImage,
};

export const REFLECTION_ICON = {
  [ReflectionStatePreset.Idle]: RecordIcon,
  [ReflectionStatePreset.Recording]: RecordIcon,
  [ReflectionStatePreset.Playing]: PauseIcon,
  [ReflectionStatePreset.Paused]: PlayIcon,
};

export const CHALLENGES = [
  {
    challengesPreset: ChallengesPreset.Mastery,
    id: 1,
    subTitle: translate('screens.product-demo.challenges.mastery.description'),
    title: translate('screens.product-demo.challenges.mastery.title'),
  },
  {
    challengesPreset: ChallengesPreset.ShapeHunt,
    id: 2,
    isImageLeft: true,
    subTitle: translate('screens.product-demo.challenges.digit-dance.description'),
    title: translate('screens.product-demo.challenges.digit-dance.title'),
  },
  {
    challengesPreset: ChallengesPreset.Meditation,
    id: 3,
    subTitle: translate('screens.product-demo.challenges.meditation.description'),
    title: translate('screens.product-demo.challenges.meditation.title'),
  },
  {
    challengesPreset: ChallengesPreset.SpinAStory,
    id: 4,
    isImageLeft: true,
    subTitle: translate('screens.product-demo.challenges.spin-a-story.description'),
    title: translate('screens.product-demo.challenges.spin-a-story.title'),
  },
  {
    challengesPreset: ChallengesPreset.Reflection,
    id: 5,
    subTitle: translate('screens.product-demo.challenges.reflection.description'),
    title: translate('screens.product-demo.challenges.reflection.title'),
  },
];

export const INITIAL_FORM_VALUE = {
  email: '',
  companyName: '',
};

export const INITIAL_FORM_ERROR = {
  email: false,
  companyName: false,
};

export const MATCH_COLUMNS_GAME_COLORS = [
  {
    backgroundColor: palette.carouselPink,
    borderColor: palette.hotPink,
    color: palette.cerise,
  },
  {
    backgroundColor: palette.lightCyan,
    borderColor: palette.blueLagoon,
    color: palette.blueLagoon,
  },
  {
    backgroundColor: palette.lemonChiffon,
    borderColor: palette.selectiveYellow,
    color: palette.tenne,
  },
];

export const GAME_PLACEHOLDER = '$BLANK$';
export const DASHED_LINE = '________';
export const EXPERIENCE_POINTS = 'LP';
export const SPACE = '\u00A0';

export const MATCH_COLUMNS_DATA = {
  columnA: [
    {
      id: 1,
      value: translate(
        'screens.product-demo.challenges.mastery.games.match-columns.column-a.option-one',
      ),
    },
    {
      id: 2,
      value: translate(
        'screens.product-demo.challenges.mastery.games.match-columns.column-a.option-two',
      ),
    },
    {
      id: 3,
      value: translate(
        'screens.product-demo.challenges.mastery.games.match-columns.column-a.option-three',
      ),
    },
  ],
  columnB: [
    {
      id: 1,
      value: translate(
        'screens.product-demo.challenges.mastery.games.match-columns.column-b.option-one',
      ),
    },
    {
      id: 2,
      value: translate(
        'screens.product-demo.challenges.mastery.games.match-columns.column-b.option-two',
      ),
    },
    {
      id: 3,
      value: translate(
        'screens.product-demo.challenges.mastery.games.match-columns.column-b.option-three',
      ),
    },
  ],
};

export const FILL_IN_THE_BLANKS_DATA = {
  options: [
    {
      id: 1,
      value: translate(
        'screens.product-demo.challenges.mastery.games.fill-in-the-blanks.option-one',
      ),
    },
    {
      id: 2,
      value: translate(
        'screens.product-demo.challenges.mastery.games.fill-in-the-blanks.option-two',
      ),
    },
    {
      id: 3,
      value: translate(
        'screens.product-demo.challenges.mastery.games.fill-in-the-blanks.option-three',
      ),
    },
  ],
  text: translate('screens.product-demo.challenges.mastery.games.fill-in-the-blanks.title'),
};

export const SELECT_THE_STATEMENT_DATA = {
  options: [
    {
      id: 1,
      value: translate('screens.product-demo.challenges.mastery.games.select-statement.option-one'),
    },
    {
      id: 2,
      value: translate('screens.product-demo.challenges.mastery.games.select-statement.option-two'),
    },
    {
      id: 3,
      value: translate(
        'screens.product-demo.challenges.mastery.games.select-statement.option-three',
      ),
    },
  ],
  text: translate('screens.product-demo.challenges.mastery.games.select-statement.title'),
};

export const INITIAL_RATING_DATA = [
  {
    filledIcon: FilledHighlyDissatisfiedIcon,
    icon: HighlyDissatisfiedIcon,
    id: RATING.HIGHLY_DISSATISFIED,
    isSelected: false,
  },
  {
    filledIcon: FilledDissatisfiedIcon,
    icon: DissatisfiedIcon,
    id: RATING.DISSATISFIED,
    isSelected: false,
  },
  {
    filledIcon: FilledNeutralIcon,
    icon: NeutralIcon,
    id: RATING.NEUTRAL,
    isSelected: false,
  },
  {
    filledIcon: FilledSatisfiedIcon,
    icon: SatisfiedIcon,
    id: RATING.SATISFIED,
    isSelected: false,
  },
  {
    filledIcon: FilledHighlySatisfiedIcon,
    icon: HighlySatisfiedIcon,
    id: RATING.HIGHLY_SATISFIED,
    isSelected: false,
  },
];

export const SHAPE_SPOTTER_DATA = {
  basePoints: 12,
  gameName: translate('screens.product-demo.challenges.shape-spotter.title'),
  gameSubType: GameType.SHAPE_SPOTTING,
  responseJson: {
    colors: [palette.lightSeaGreen, palette.raspberryPink, palette.selectiveYellow],
    cols: 5,
    gameTimer: 10,
    qualificationPercentage: 50,
    rows: 5,
    shapesId: [1, 2, 3],
  },
  rules: [
    translate('screens.product-demo.challenges.shape-spotter.rules.rule-1'),
    translate('screens.product-demo.challenges.shape-spotter.rules.rule-2'),
    translate('screens.product-demo.challenges.shape-spotter.rules.rule-3'),
  ],
};

export const STORY_GAME_DATA = {
  basePoints: 10,
  gameName: translate('screens.product-demo.challenges.spin-a-story.title'),
  gameSubType: GameType.STORY_TELLING,
  responseJson: {
    decisionPoints: [
      {
        id: 'decision_1',
        options: [
          {
            id: 'A',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-1.option-1.title',
            ),
            nextDecisionId: 'decision_2',
            outcome: null,
            suggestedFeedback: null,
          },
          {
            id: 'B',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-1.option-2.title',
            ),
            nextDecisionId: 'decision_3',
            outcome: null,
            suggestedFeedback: null,
          },
        ],
      },
      {
        id: 'decision_2',
        options: [
          {
            id: 'A1',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-2.option-1.title',
            ),
            nextDecisionId: 'decision_4',
            outcome: null,
            suggestedFeedback: null,
          },
          {
            id: 'A2',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-2.option-2.title',
            ),
            nextDecisionId: 'decision_5',
            outcome: null,
            suggestedFeedback: null,
          },
        ],
      },
      {
        id: 'decision_3',
        options: [
          {
            id: 'B1',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-3.option-1.title',
            ),
            nextDecisionId: 'decision_6',
            outcome: null,
            suggestedFeedback: null,
          },
          {
            id: 'B2',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-3.option-2.title',
            ),
            nextDecisionId: 'decision_7',
            outcome: null,
            suggestedFeedback: null,
          },
        ],
      },
      {
        id: 'decision_4',
        options: [
          {
            id: 'A11',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-4.option-1.title',
            ),
            nextDecisionId: null,
            outcome: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-4.option-1.outcome',
            ),
            suggestedFeedback: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-4.option-1.feedback',
            ),
          },
          {
            id: 'A12',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-4.option-2.title',
            ),
            nextDecisionId: null,
            outcome: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-4.option-2.outcome',
            ),
            suggestedFeedback: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-4.option-2.feedback',
            ),
          },
        ],
      },
      {
        id: 'decision_5',
        options: [
          {
            id: 'A21',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-5.option-1.title',
            ),
            nextDecisionId: null,
            outcome: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-5.option-1.outcome',
            ),
            suggestedFeedback: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-5.option-1.feedback',
            ),
          },
          {
            id: 'A22',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-5.option-2.title',
            ),
            nextDecisionId: null,
            outcome: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-5.option-2.outcome',
            ),
            suggestedFeedback: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-5.option-2.feedback',
            ),
          },
        ],
      },
      {
        id: 'decision_6',
        options: [
          {
            id: 'B11',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-6.option-1.title',
            ),
            nextDecisionId: null,
            outcome: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-6.option-1.outcome',
            ),
            suggestedFeedback: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-6.option-1.feedback',
            ),
          },
          {
            id: 'B12',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-6.option-2.title',
            ),
            nextDecisionId: null,
            outcome: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-6.option-2.outcome',
            ),
            suggestedFeedback: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-6.option-2.feedback',
            ),
          },
        ],
      },
      {
        id: 'decision_7',
        options: [
          {
            id: 'B21',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-7.option-1.title',
            ),
            nextDecisionId: null,
            outcome: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-7.option-1.outcome',
            ),
            suggestedFeedback: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-7.option-1.feedback',
            ),
          },
          {
            id: 'B22',
            label: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-7.option-2.title',
            ),
            nextDecisionId: null,
            outcome: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-7.option-2.outcome',
            ),
            suggestedFeedback: translate(
              'screens.product-demo.challenges.spin-a-story.decisions.decision-7.option-2.feedback',
            ),
          },
        ],
      },
    ],
    story: translate('screens.product-demo.challenges.spin-a-story.story.description'),
    title: translate('screens.product-demo.challenges.spin-a-story.story.title'),
  },
  rules: [
    translate('screens.product-demo.challenges.spin-a-story.rules.rule-1'),
    translate('screens.product-demo.challenges.spin-a-story.rules.rule-2'),
    translate('screens.product-demo.challenges.spin-a-story.rules.rule-3'),
    translate('screens.product-demo.challenges.spin-a-story.rules.rule-4'),
    translate('screens.product-demo.challenges.spin-a-story.rules.rule-5'),
    translate('screens.product-demo.challenges.spin-a-story.rules.rule-6'),
    translate('screens.product-demo.challenges.spin-a-story.rules.rule-7'),
  ],
};

export const OPTIONS_DATA = [
  { id: 1, title: translate('screens.product-demo.details-form.yes'), value: AgreementOptions.Yes },
  {
    id: 2,
    title: translate('screens.product-demo.details-form.maybe'),
    value: AgreementOptions.Maybe,
  },
  { id: 3, title: translate('screens.product-demo.details-form.no'), value: AgreementOptions.No },
];
