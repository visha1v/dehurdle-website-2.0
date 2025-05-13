import {
  ComparerImage,
  ComparerLottie,
  CompassionLottie,
  CuriosityLottie,
  DistractorImage,
  DistractorLottie,
  FearfulImage,
  FearfulLottie,
  HyperEmotionalImage,
  HyperEmotionalLottie,
  OverthinkerImage,
  OverthinkerLottie,
  PessimistImage,
  PessimistLottie,
  PleaserImage,
  PleaserLottie,
  ProcrastinatorImage,
  ProcrastinatorLottie,
  SelfRealisationLottie,
} from 'assets';
import { CAMEL_TO_SNAKE_REGEX, PASCAL_TO_SNAKE_REGEX, Wreckers } from 'constant';
import { translate } from 'locales';
import enJson from 'locales/en.json';
import spacing from 'theme/spacing';

/** validate regex */
export const validateRegex = (email: string, regex: any) => {
  return regex.test(email);
};

export const convertKeysToCamelCase = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    const value = obj[key];

    acc[camelCaseKey] =
      typeof value === 'object' && value !== null ? convertKeysToCamelCase(value) : value;

    return acc;
  }, {});
};

export const getToastMessage = (code: string) => {
  const { content } = enJson;
  const isCodeExist = content.hasOwnProperty(code);
  const message = isCodeExist
    ? translate(`content.${code}.message`)
    : translate('content.DEFAULT.message');
  return message;
};

export const getLottieDimensions = (innerWidth: number) => {
  let height = '';
  let width = '';

  if (innerWidth < 600) {
    height = '46vh';
    width = '89vw';
  } else if (innerWidth < 1280) {
    height = '30vh';
    width = '40vw';
  } else if (innerWidth > 1280) {
    height = '30vh';
    width = '17vw';
  }
  return { height, width };
};

export const getWreckersSource = (name: string) => {
  let imageSource: any;
  let lottieSource: any;
  switch (name) {
    case Wreckers.Distractor:
      lottieSource = DistractorLottie;
      imageSource = DistractorImage;
      break;
    case Wreckers.Overthinker:
      lottieSource = OverthinkerLottie;
      imageSource = OverthinkerImage;
      break;
    case Wreckers.Pessimist:
      lottieSource = PessimistLottie;
      imageSource = PessimistImage;
      break;
    case Wreckers.Pleaser:
      lottieSource = PleaserLottie;
      imageSource = PleaserImage;
      break;
    case Wreckers.Procrastinator:
      lottieSource = ProcrastinatorLottie;
      imageSource = ProcrastinatorImage;
      break;
    case Wreckers.Fearful:
      lottieSource = FearfulLottie;
      imageSource = FearfulImage;
      break;
    case Wreckers.Comparer:
      lottieSource = ComparerLottie;
      imageSource = ComparerImage;
      break;
    case Wreckers.HyperEmotional:
      lottieSource = HyperEmotionalLottie;
      imageSource = HyperEmotionalImage;
      break;
    case Wreckers.Compassion:
      lottieSource = CompassionLottie;
      break;
    case Wreckers.Curiosity:
      lottieSource = CuriosityLottie;
      break;
    case Wreckers.SelfRealisation:
      lottieSource = SelfRealisationLottie;
      break;
  }
  return { lottieSource, imageSource };
};

export const getColorBarMarkerDimension = (innerWidth: number) => {
  let height = '';
  let width = '';

  if (innerWidth < 600) {
    width = spacing.Spacing_77;
    height = spacing.Spacing_69;
  } else if (innerWidth < 1280) {
    width = spacing.Spacing_53;
    height = spacing.Spacing_47;
  } else if (innerWidth < 1920) {
    width = spacing.Spacing_77;
    height = spacing.Spacing_69;
  }
  return { height, width };
};

export const setLocalStorageValue = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageValue = (key: string) => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : null;
};

export const removeLocalStorageValue = (key: string) => {
  localStorage.removeItem(key);
};

export const interpolateColor = (
  initialColor: string,
  finalColor: string,
  factor: number,
): string => {
  const hexToRgb = (hex: string): number[] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const rgbToHex = (rgb: number[]): string =>
    `#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`;

  const [r1, g1, b1] = hexToRgb(initialColor);
  const [r2, g2, b2] = hexToRgb(finalColor);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return rgbToHex([r, g, b]);
};

export const onStoreClick = (url: string) => () => {
  window.open(url, '_blank');
};

/**
 * This function returns the min and max value of the assessment report pointer for adjust pointer on 100 and 0
 * @param isMobile : boolean
 * @returns {min:number, max:number}
 */
export const getAssessmentReportPointerOffset = (
  isMobile: boolean,
  isTablet: boolean,
): { min: number; max: number } => {
  let min = -7;
  let max = 108;

  if (isMobile) {
    min = -6;
    max = 118;
  } else if (isTablet) {
    min = -5;
    max = 106;
  }

  return { min, max };
};

/**
 * Converts keys of an object from camelCase to snake_case recursively
 * @param obj Input object whose key need to be converted
 * @returns Object with keys converted to snake_case
 */

export const toSnakeCase = (str: string): string =>
  str.replace(CAMEL_TO_SNAKE_REGEX, '$1_$2').replace(PASCAL_TO_SNAKE_REGEX, '$1_$2').toLowerCase();

export const convertKeysToSnakeCase = (data: any): any => {
  let res = data;
  if (Array.isArray(data)) {
    res = data.map(convertKeysToSnakeCase);
  } else if (data !== null && typeof data === 'object') {
    res = Object.entries(data).reduce(
      (acc, [key, value]) => {
        const newKey = toSnakeCase(key);
        acc[newKey] = convertKeysToSnakeCase(value);
        return acc;
      },
      {} as { [key: string]: any },
    );
  }
  return res;
};

export const convertTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
