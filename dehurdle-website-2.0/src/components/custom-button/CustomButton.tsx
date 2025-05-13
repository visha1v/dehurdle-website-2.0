import { ButtonVariant } from 'constant';

import { Autorenew } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

import './customButton-styles.scss';

interface ICustomButton {
  buttonContainerClassName?: string;
  disabled?: boolean;
  isCapitalize?: boolean;
  isLoading?: boolean;
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  buttonTextClassName?: string;
}
const CustomButton = (props: ICustomButton) => {
  const {
    buttonContainerClassName = '',
    disabled = false,
    isCapitalize = false,
    isLoading = false,
    label,
    onClick,
    variant = ButtonVariant.Contained,
    buttonTextClassName = '',
  } = props;

  const buttonTitleClass = `custom-button__title ${buttonTextClassName} ${isCapitalize && 'custom-button__title-capital'} ${isLoading && 'custom-button__loading-title'}`;

  return (
    <Button
      className={`custom-button__container ${buttonContainerClassName} ${isLoading && 'custom-button__loading'}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      disableRipple
      disableElevation
      variant={variant}>
      {isLoading ? (
        <Autorenew className="custom-button__loader" />
      ) : (
        <Typography className={buttonTitleClass}>{label}</Typography>
      )}
    </Button>
  );
};

export default CustomButton;
