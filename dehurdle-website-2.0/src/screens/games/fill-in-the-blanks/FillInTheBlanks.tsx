import { useState } from 'react';

import { CustomButton } from 'components';
import { DASHED_LINE, GAME_PLACEHOLDER } from 'constant/product-demo-constants';
import { translate } from 'locales';
import palette from 'theme/colors';
import { IFillInTheBlanksConfigType, IOptionItem } from 'types';

import { Typography } from '@mui/material';

import './fill-in-the-blanks-styles.scss';

interface IFillInTheBlanksProps {
  data: IFillInTheBlanksConfigType;
  handleSubmitPress: (option: IOptionItem) => void;
  showLoader: boolean;
  title: string;
}

const FillInTheBlanks = (props: IFillInTheBlanksProps) => {
  const { data, handleSubmitPress, showLoader, title } = props;
  const { text, options } = data;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const showPlaceholder = text.includes(GAME_PLACEHOLDER);
  const [prePlaceholderText, postPlaceholderText] = text.split(GAME_PLACEHOLDER);

  const handleOptionPress = (optionId: number) => () => {
    setSelectedOption(prevOption => (prevOption === optionId ? null : optionId));
  };

  const handleSubmit = () => {
    const option = data.options.find(option => option.id === selectedOption)!;
    handleSubmitPress(option);
  };

  const renderGameOptions = () => {
    return options.map(option => {
      const { id, value } = option;
      const isSelected = selectedOption === id;
      const activeContainerStyle = isSelected
        ? { backgroundColor: palette.iceWhite, borderColor: palette.bianchiGreen }
        : {};
      const activeTitleStyle = isSelected ? { color: palette.greenCyan } : {};

      return (
        <div
          className="fill-in-the-blanks__option-sub-container"
          key={id}
          onClick={handleOptionPress(id)}
          style={activeContainerStyle}>
          <Typography className="fill-in-the-blanks__option-title" style={activeTitleStyle}>
            {value}
          </Typography>
        </div>
      );
    });
  };

  return (
    <div className="fill-in-the-blanks__container">
      <div>
        <Typography className="fill-in-the-blanks__title">{title}</Typography>
        <Typography className="fill-in-the-blanks__sub-title">
          {prePlaceholderText}
          {!!showPlaceholder && (
            <span className="fill-in-the-blanks__placeholder">{DASHED_LINE}</span>
          )}
          {postPlaceholderText}
        </Typography>
        <div className="fill-in-the-blanks__option-container">{renderGameOptions()}</div>
      </div>
      <CustomButton
        buttonContainerClassName="fill-in-the-blanks__button"
        disabled={selectedOption === null}
        isLoading={showLoader}
        label={translate('common.continue')}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default FillInTheBlanks;
