import React from 'react';

import { CustomButton } from 'components';

import { Typography } from '@mui/material';

import './screenWrapper-styles.scss';

interface IScreenWrapperProps {
  buttonLabel?: string;
  children: React.ReactNode;
  footerContainer?: React.ReactNode;
  headerContainer?: React.ReactNode;
  headerSubTitle?: string;
  headerTitle?: string;
  isButtonDisabled?: boolean;
  isButtonLoading?: boolean;
  onButtonClick?: () => void;
  subTitleClassName?: string;
}

const ScreenWrapper = (props: IScreenWrapperProps) => {
  const {
    buttonLabel = '',
    children,
    footerContainer = null,
    headerContainer = null,
    headerSubTitle = '',
    headerTitle = '',
    isButtonDisabled = false,
    isButtonLoading = false,
    onButtonClick,
    subTitleClassName,
  } = props;

  const onClick = () => {
    onButtonClick && onButtonClick();
  };

  return (
    <div className="screen-wrapper">
      <div className="screen-wrapper__container">
        <div className="screen-wrapper__header-container">
          {!!headerTitle && (
            <Typography className="screen-wrapper__header-title">{headerTitle}</Typography>
          )}
          {!!headerSubTitle && (
            <Typography className={`screen-wrapper__header-sub-title ${subTitleClassName}`}>
              {headerSubTitle}
            </Typography>
          )}
          {headerContainer}
          {children}
        </div>
        {(buttonLabel || footerContainer) && (
          <div className="screen-wrapper__footer-container">
            {footerContainer}
            <CustomButton
              buttonContainerClassName="screen-wrapper__button"
              disabled={isButtonDisabled}
              label={buttonLabel}
              onClick={onClick}
              isLoading={isButtonLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { ScreenWrapper };
