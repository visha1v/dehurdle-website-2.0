import { useState } from 'react';

import { CustomButton } from 'components';
import { translate } from 'locales';
import palette from 'theme/colors';
import { IOptionItem, ISelectStatementGameDataType, MasteryGamesPreset } from 'types';

import { Typography } from '@mui/material';

import './select-statement-styles.scss';

interface ISelectStatementProps {
  data: ISelectStatementGameDataType;
  handleSubmitPress: (selectedOption: IOptionItem) => void;
  showLoader: boolean;
}

const SelectStatement = (props: ISelectStatementProps) => {
  const { data, handleSubmitPress, showLoader } = props;
  const { text: title } = data;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionPress = (optionId: number) => () => {
    setSelectedOption(prevOption => (prevOption === optionId ? null : optionId));
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const option = data.options.find(option => option.id === selectedOption)!;
      handleSubmitPress(option);
    }
  };

  const renderOptions = () => {
    return data.options.map(option => {
      const { id, value } = option;
      const isSelected = selectedOption === id;
      const activeContainerStyle = isSelected
        ? {
            borderColor: palette.bianchiGreen,
            backgroundColor: palette.iceWhite,
          }
        : {};
      const activeTitleStyle = isSelected
        ? {
            color: palette.greenCyan,
          }
        : {};

      return (
        <div
          className="select-statement__option-container"
          key={id}
          onClick={handleOptionPress(id)}
          style={activeContainerStyle}>
          <Typography className="select-statement__option-title" style={activeTitleStyle}>
            {value}
          </Typography>
        </div>
      );
    });
  };

  return (
    <div id={MasteryGamesPreset.SelectStatement} className="select-statement__container">
      <Typography className="select-statement__title">{title}</Typography>
      <div className="select-statement__sub-container">{renderOptions()}</div>
      <CustomButton
        buttonContainerClassName="select-statement__button"
        disabled={!selectedOption}
        isLoading={showLoader}
        label={translate('common.continue')}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default SelectStatement;
