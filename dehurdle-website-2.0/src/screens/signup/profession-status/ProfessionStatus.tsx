import { CustomButton } from 'components';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './professionStatus-styles.scss';

interface IProfessionStatusProps {
  onConfirmClick: () => void;
  onCancelClick: () => void;
}

const ProfessionStatus = (props: IProfessionStatusProps) => {
  const { onConfirmClick, onCancelClick } = props;

  return (
    <div className="profession-status__container">
      <div className="profession-status__sub-container">
        <Typography className="profession-status__title">
          {translate('screens.sign-up.profession-status.title')}
        </Typography>
        <div className="profession-status__button-container">
          <CustomButton isCapitalize label={translate('common.yes')} onClick={onConfirmClick} />
          <CustomButton
            buttonContainerClassName="profession-status__back-button"
            buttonTextClassName="profession-status__button-title"
            isCapitalize
            label={translate('common.no')}
            onClick={onCancelClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionStatus;
