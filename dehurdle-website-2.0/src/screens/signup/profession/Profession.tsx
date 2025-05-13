import { CustomButton, CustomInputField } from 'components';
import { InputPreset } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './profession-styles.scss';

interface IProfessionProps {
  handleContinueClick: () => void;
  handleProfessionChange: (profession: string) => void;
  professions: string[];
  selectedProfession: string;
}

const Profession = (props: IProfessionProps) => {
  const { handleContinueClick, handleProfessionChange, professions, selectedProfession } = props;

  const dropdownOptions = professions.map(profession => ({
    title: profession,
    value: profession,
  }));

  const handleDropdownChange = (selectedValue: string) => {
    handleProfessionChange(selectedValue);
  };

  return (
    <div className="profession__container">
      <div className="profession__sub-container">
        <div className="profession__main-container">
          <Typography className="profession__title">
            {translate('screens.sign-up.profession.title')}
          </Typography>
          <CustomInputField
            dropdownModalButtonLabel={translate('common.done')}
            dropdownModalTitle={translate('screens.sign-up.profession.dropdown-title')}
            onChange={handleDropdownChange}
            options={dropdownOptions}
            placeholder={translate('screens.sign-up.profession.title')}
            type={InputPreset.Dropdown}
            value={selectedProfession}
          />
        </div>
        <CustomButton
          buttonContainerClassName="profession__button"
          disabled={!selectedProfession}
          label={translate('screens.sign-up.button-title.continue')}
          isCapitalize
          onClick={handleContinueClick}
        />
      </div>
    </div>
  );
};

export default Profession;
