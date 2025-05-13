import React from 'react';

import { DateFormatType, IDropDownOptions, InputAdornmentPosition, InputPreset } from 'constant';
import dayjs from 'dayjs';
import { validateRegex } from 'utils';

import { FormControl, FormLabel, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CustomDropdown from '../custom-dropdown/CustomDropdown';
import CustomOtpInput from '../custom-otp-input/CustomOtpInput';
import CustomTextField from '../custom-text-field/CustomTextField';

import './customInputField-styles.scss';

interface ICustomInputFieldProps {
  dateformat?: string;
  dropdownModalButtonLabel?: string;
  dropdownModalTitle?: string;
  errorText?: string;
  inputContainerClassName?: string;
  inputErrorClassName?: string;
  inputTextClassName?: string;
  isFocus?: boolean;
  isRequired?: boolean;
  label?: string;
  maxDate?: dayjs.Dayjs;
  onBlur?: () => void;
  onChange: (value?: any) => void;
  options?: IDropDownOptions[];
  placeholder?: string;
  regex?: RegExp;
  type?: InputPreset;
  value: any; // TODO:: need to modify any with proper type
}

const CustomInputField = (props: ICustomInputFieldProps) => {
  const {
    dateformat = DateFormatType.FullDateDashFormat,
    dropdownModalTitle = '',
    dropdownModalButtonLabel = '',
    errorText = '',
    inputContainerClassName = '',
    inputErrorClassName = '',
    inputTextClassName = '',
    isFocus = false,
    isRequired = false,
    label = '',
    maxDate,
    onBlur,
    onChange,
    options = [],
    placeholder = '',
    regex,
    type = InputPreset.Text,
    value,
  } = props;

  const errorClassName =
    type === InputPreset.Otp ? 'input-field__otp-error-text' : 'input-field__error-text';

  const onValueChange = (value: any) => {
    if (regex) {
      const isValid = validateRegex(value, regex);

      if (value === '' || isValid) {
        onChange(value);
      }
    } else {
      onChange(value);
    }
  };

  const getField = (type: string) => {
    let component = null;

    switch (type) {
      case InputPreset.Date:
        component = (
          <DatePicker
            className="input-field__date-picker"
            format={dateformat}
            onChange={(value: React.SetStateAction<dayjs.Dayjs | null>) => onValueChange(value)}
            slotProps={{
              inputAdornment: { position: InputAdornmentPosition.End },
              textField: {
                placeholder: placeholder,
                onKeyDown: e => e.preventDefault(),
              },
            }}
            value={value}
            maxDate={maxDate}
          />
        );
        break;

      case InputPreset.Dropdown:
        component = (
          <CustomDropdown
            placeholder={placeholder}
            options={options}
            value={value}
            dropdownModalTitle={dropdownModalTitle}
            dropdownModalButtonLabel={dropdownModalButtonLabel}
            onChange={onValueChange}
          />
        );
        break;

      case InputPreset.Otp:
        component = (
          <CustomOtpInput
            errorText={errorText}
            onChange={onValueChange}
            placeholder={placeholder}
            value={value}
          />
        );
        break;

      case InputPreset.Number:
        component = (
          <CustomTextField
            containerClassName={inputContainerClassName}
            isFocus={isFocus}
            onBlur={onBlur}
            onChange={onValueChange}
            placeholder={placeholder}
            type={InputPreset.Number}
            value={value}
          />
        );
        break;

      default:
        component = (
          <CustomTextField
            containerClassName={inputContainerClassName}
            isFocus={isFocus}
            onBlur={onBlur}
            onChange={onValueChange}
            placeholder={placeholder}
            value={value}
          />
        );
        break;
    }
    return component;
  };

  return (
    <FormControl className="input-field">
      <FormLabel className={`input-field__label ${inputTextClassName}`} required={isRequired}>
        {label}
      </FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{getField(type)}</LocalizationProvider>
      <Typography className={`${errorClassName} ${inputErrorClassName}`}>{errorText}</Typography>
    </FormControl>
  );
};

export default CustomInputField;
