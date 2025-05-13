enum AppEnv {
  Dev = 'development',
  Prod = 'production',
  Staging = 'staging',
}

const COLOR_MAX_RANGE = '100';
const COLOR_MIN_RANGE = '0';
const COUNTRY_CODE = '+91';
const DEBOUNCE_TIME = 1000;
const ENTER = 'Enter';
const KEY_DOWN = 'keydown';
const MIN_AGE = 18;
const OTP_LENGTH = 4;
const RESEND_OTP_LIMIT = 30;
const TOAST_DURATION = 3000;
const YEAR = 'year';
const CAROUSEL_SPEED = 45;
const TAB_PORTRAIT_MAX_WIDTH = 1024;
const WHATSAPP_CONTACT = '+919986103592';
const LOTTIE_DEFAULT_STYLE = {
  height: '',
  width: '',
};
const PHONE_INPUT_LIMIT = 10;

enum ImageAlignment {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

enum LocalStorageKeys {
  AuthToken = 'authToken',
  CurrentQuestionNumber = 'currentQuestionNumber',
  HasTakenAssessment = 'hasTakenAssessment',
  IsAccountCreated = 'isAccountCreated',
  IsLoggedIn = 'isLoggedIn',
  ConfigData = 'configData',
  WreckerAnswer = 'wreckerAnswer',
  WreckerQuestionsData = 'wreckerQuestionsData',
  WreckerScreenName = 'wreckerScreenName',
}

export interface IDropDownOptions {
  title: string;
  value: string | number;
}

enum IHomeCardPreset {
  Primary = 'primary',
  Secondary = 'secondary',
}

enum CustomAppWrapperPreset {
  Default = 'Default',
  Quiz = 'Quiz',
  Demo = 'Demo',
}

enum CarouselDirection {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down',
}

const CAROUSEL_SETTINGS = {
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: 'linear',
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
};

export {
  AppEnv,
  CAROUSEL_SETTINGS,
  CAROUSEL_SPEED,
  CarouselDirection,
  COLOR_MAX_RANGE,
  COLOR_MIN_RANGE,
  COUNTRY_CODE,
  CustomAppWrapperPreset,
  DEBOUNCE_TIME,
  ENTER,
  IHomeCardPreset,
  ImageAlignment,
  KEY_DOWN,
  LocalStorageKeys,
  LOTTIE_DEFAULT_STYLE,
  MIN_AGE,
  OTP_LENGTH,
  RESEND_OTP_LIMIT,
  TAB_PORTRAIT_MAX_WIDTH,
  TOAST_DURATION,
  WHATSAPP_CONTACT,
  YEAR,
  PHONE_INPUT_LIMIT,
};
