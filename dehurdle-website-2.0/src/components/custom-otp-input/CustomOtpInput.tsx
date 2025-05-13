import { InputMode, ONLY_NUMBER_REGEX } from 'constant';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { validateRegex } from 'utils';

import './customOtpInput-styles.scss';

interface ICustomOtpInputProps {
  errorText: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

const CustomOtpInput = (props: ICustomOtpInputProps) => {
  const { errorText, onChange, placeholder = '', value } = props;

  const validateOtpField = (value: string) => {
    return validateRegex(value, ONLY_NUMBER_REGEX);
  };

  return (
    <MuiOtpInput
      autoFocus
      gap={1}
      onChange={(value: string) => onChange(value)}
      TextFieldsProps={{
        InputProps: {
          className: errorText ? 'otp-input-field__error' : 'otp-input-field__input-text',
          placeholder: placeholder,
        },
        inputProps: {
          inputMode: InputMode.Numeric,
        },
      }}
      validateChar={validateOtpField}
      value={value}
    />
  );
};

export default CustomOtpInput;
