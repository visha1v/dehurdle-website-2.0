import React from 'react';

import { COUNTRY_CODE, InputAdornmentPosition, InputPreset, PHONE_INPUT_LIMIT } from 'constant';

import { InputAdornment, TextField, Typography } from '@mui/material';

import './customTextField-styles.scss';

interface ICustomTextFieldProps {
  containerClassName?: string;
  endIcon?: React.ReactNode;
  isFocus?: boolean;
  onBlur?: () => void;
  onChange: (value: string) => void;
  placeholder?: string;
  startIcon?: React.ReactNode;
  type?: InputPreset;
  value: string;
}

const CustomTextField = (props: ICustomTextFieldProps) => {
  const {
    containerClassName = '',
    endIcon = <></>,
    isFocus = false,
    onBlur,
    onChange,
    placeholder = '',
    startIcon = <></>,
    type = InputPreset.Text,
    value,
  } = props;
  return (
    <TextField
      autoFocus={isFocus}
      autoComplete="off"
      slotProps={{
        htmlInput: {
          maxLength: type === InputPreset.Number ? PHONE_INPUT_LIMIT : undefined,
        },
        input: {
          startAdornment: (
            <InputAdornment position={InputAdornmentPosition.Start}>
              {type === InputPreset.Number ? (
                <Typography className="text-field__start-adornment-phone">
                  {COUNTRY_CODE}
                </Typography>
              ) : (
                startIcon
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position={InputAdornmentPosition.End}>{endIcon}</InputAdornment>
          ),
          classes: {
            root: `text-field__input ${containerClassName}`,
          },
        },
      }}
      onBlur={onBlur}
      onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default CustomTextField;
