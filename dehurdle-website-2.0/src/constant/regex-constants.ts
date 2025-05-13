export const ALPHABET_REGEX = /^[a-zA-Z ]*$/;
export const CAMEL_TO_SNAKE_REGEX = /([a-z])([A-Z])/g;
export const EMAIL_REGEX = /^(?!\.)(?!.*\.@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const ONLY_NUMBER_REGEX = /^\d*$/;
export const PASCAL_TO_SNAKE_REGEX = /([A-Z])([A-Z][a-z])/g;
export const PROFESSION_EMAIL_REGEX =
  /^[a-zA-Z0-9._+-]+(?<!\.)@(?!gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|aol\.com|protonmail\.com|live\.com|mail\.com|zoho\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
export const SPACE_REGEX = /\s/g;
export const MOBILE_REGEX = /^(?!0{10})\d{10}$/;
