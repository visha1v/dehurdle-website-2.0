import { GameType } from 'constant';

export interface IProductDetailsValue {
  email: string;
  companyName: string;
}

export interface IProductDetailsError {
  email: boolean;
  companyName: boolean;
}

export interface IOptionItem {
  id: number;
  value: string;
}

export interface IMatchColumnsConfigType {
  columnA: Array<IOptionItem>;
  columnB: Array<IOptionItem>;
}

export interface IColorData {
  backgroundColor: string;
  borderColor: string;
  color: string;
}

export interface IMatchingPair {
  colorData: IColorData;
  leftOptionId: number;
  rightOptionId: number;
}

export interface ActiveLeftData {
  colorData: IColorData;
  id: number;
}

export interface IFillInTheBlanksConfigType {
  options: Array<IOptionItem>;
  text: string;
}

export interface ISelectStatementGameDataType {
  options: Array<IOptionItem>;
  text: string;
}

export enum DetailsModalFieldPreset {
  Email = 'email',
  CompanyName = 'companyName',
}

export enum MasteryGamesPreset {
  MatchColumns = 'matchColumns',
  SelectStatement = 'selectStatement',
}

export enum ChallengesPreset {
  Mastery = 'mastery',
  ShapeHunt = 'shapeHunt',
  Meditation = 'meditation',
  SpinAStory = 'spinAStory',
  Reflection = 'reflection',
}

export enum ActiveMediaPreset {
  ShapeSpotting = 'shapeSpotting',
  DemoVideo = 'demoVideo',
  MasteryAudio = 'masteryAudio',
  MeditationAudio = 'meditationAudio',
  ReflectionAudio = 'reflectionAudio',
  SpinAStory = 'spinAStory',
}

export enum ReflectionStatePreset {
  Idle = 'idle',
  Recording = 'recording',
  Playing = 'playing',
  Paused = 'paused',
}

export interface IShapeSpotterResponseJsonItem {
  colors: Array<string>;
  cols: number;
  gameTimer: number;
  qualificationPercentage: number;
  rows: number;
  shapesId: Array<number>;
}

interface DecisionOptionItem {
  id: string;
  label: string;
  nextDecisionId: string | null;
  outcome: string | null;
  suggestedFeedback: string | null;
}

interface DecisionItem {
  id: string;
  options: Array<DecisionOptionItem>;
}

export interface IStoryGameResponseJsonItem {
  decisionPoints: Array<DecisionItem>;
  story: string;
  title: string;
}

export interface IShapeSpotterDataType {
  color: string;
  id: string;
  isDisabled: boolean;
  shapeId: number;
}

export interface IGameType {
  basePoints: number;
  gameName: string;
  gameSubType: GameType;
  responseJson: IShapeSpotterResponseJsonItem | IStoryGameResponseJsonItem;
  rules: Array<string>;
}

export interface IBreakpoints {
  preset: string;
  seconds: number;
}
