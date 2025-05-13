import { MasteryCardBackgroundImage } from 'assets';
import { CHALLENGES_BACKGROUND_IMAGE, EMAIL_REGEX } from 'constant';
import { DetailsModalFieldPreset, IProductDetailsError, IProductDetailsValue } from 'types';

export const isFormValid = (formError: IProductDetailsError, formValue: IProductDetailsValue) => {
  let isValid = true;
  Object.entries(formValue).forEach(field => {
    const [key, value] = field as [DetailsModalFieldPreset, string];
    let newValue = false;
    if (key === DetailsModalFieldPreset.Email && !EMAIL_REGEX.test(value)) {
      newValue = true;
    } else {
      newValue = !value.trim();
    }
    formError[key] = newValue;

    if (isValid) {
      isValid = !newValue;
    }
  });
  return { isValid, formError };
};

export const getBackgroundImage = (preset: string) => {
  return CHALLENGES_BACKGROUND_IMAGE[preset] || MasteryCardBackgroundImage;
};
