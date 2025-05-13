import React, { useCallback, useState } from 'react';

import { DownArrow } from 'assets';
import { IDropDownOptions, InputAdornmentPosition } from 'constant';

import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import CustomButton from '../custom-button/CustomButton';
import CustomDialog from '../custom-dialog/CustomDialog';

import './customDropdown-styles.scss';

interface ICustomDropdownProps {
  dropdownModalButtonLabel: string;
  dropdownModalTitle: string;
  onChange: (value: string) => void;
  options: IDropDownOptions[];
  placeholder?: string;
  value: string;
}

const CustomDropdown = (props: ICustomDropdownProps) => {
  const {
    dropdownModalButtonLabel,
    dropdownModalTitle,
    onChange,
    options,
    placeholder = '',
    value,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const getDropdownTitle = useCallback(
    (value: string) => {
      const selectedOption = options.find(option => option.value === value);
      return selectedOption?.title;
    },
    [options],
  );

  const renderDropdownOptions = useCallback(() => {
    return options.map(option => {
      const { title, value: currentValue } = option;
      return (
        <FormControlLabel
          className={`dropdown__radio-options ${selectedValue === currentValue && 'dropdown__radio-selected-label'}`}
          control={<Radio />}
          key={title}
          label={title}
          value={currentValue}
        />
      );
    });
  }, [options, selectedValue]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedValue(value);
    setOpenModal(false);
  };

  const onValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const onButtonClick = () => {
    onChange(selectedValue);
    setOpenModal(false);
  };

  return (
    <>
      <TextField
        autoComplete="off"
        slotProps={{
          htmlInput: {
            readOnly: true,
          },
          input: {
            classes: {
              root: 'dropdown__input',
            },
            endAdornment: (
              <InputAdornment position={InputAdornmentPosition.End}>
                <IconButton>
                  <DownArrow />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        onClick={handleOpenModal}
        placeholder={placeholder}
        value={getDropdownTitle(value)}
      />
      <CustomDialog open={openModal} onClose={handleCloseModal}>
        <div className="dropdown__dialog-container">
          <Typography className="dropdown__title">{dropdownModalTitle}</Typography>
          <RadioGroup
            className="dropdown__radio-container"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onValueChange(event.target.value);
            }}
            value={selectedValue}>
            {renderDropdownOptions()}
          </RadioGroup>
          <CustomButton
            buttonContainerClassName="dropdown__button"
            disabled={!selectedValue}
            label={dropdownModalButtonLabel}
            onClick={onButtonClick}
          />
        </div>
      </CustomDialog>
    </>
  );
};

export default CustomDropdown;
