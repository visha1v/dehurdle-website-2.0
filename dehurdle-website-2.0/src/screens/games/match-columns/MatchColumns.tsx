import { useState } from 'react';

import { CustomButton } from 'components';
import { MATCH_COLUMNS_GAME_COLORS } from 'constant';
import { translate } from 'locales';
import {
  ActiveLeftData,
  IMatchColumnsConfigType,
  IMatchingPair,
  MasteryGamesPreset,
} from 'types/productDemo-types';

import { Typography } from '@mui/material';

import './match-columns-styles.scss';

interface IMatchColumnsProps {
  data: IMatchColumnsConfigType;
  handleSubmitPress: (data: Record<number, number>) => void;
  showLoader: boolean;
}

const MatchColumns = (props: IMatchColumnsProps) => {
  const { data, handleSubmitPress, showLoader } = props;
  const { columnA, columnB } = data;

  const [pairs, setPairs] = useState<Array<IMatchingPair>>([]);
  const [activeLeftData, setActiveLeftData] = useState<ActiveLeftData | null>(null);

  const isButtonDisabled = pairs.length !== columnA.length;

  const getRandomColor = () => {
    const usedColors = pairs.map(pair => pair.colorData.backgroundColor);
    const availableColors = MATCH_COLUMNS_GAME_COLORS.filter(
      color => !usedColors.includes(color.backgroundColor),
    );
    return availableColors.length > 0 ? availableColors[0] : MATCH_COLUMNS_GAME_COLORS[0];
  };

  const getColors = (isLeftColumn: boolean, id: number) => {
    if (isLeftColumn && activeLeftData?.id === id) {
      return activeLeftData?.colorData;
    } else {
      const pair = pairs.find(pair => {
        return isLeftColumn ? pair.leftOptionId === id : pair.rightOptionId === id;
      });
      return pair?.colorData;
    }
  };

  const handleLeftOptionPress = (id: number) => () => {
    const isPairPresent = pairs.find(pair => pair.leftOptionId === id);
    let updatedLeftData: typeof activeLeftData = { id, colorData: getRandomColor() };
    if (isPairPresent) {
      if (!activeLeftData) {
        setPairs(pairs.filter(pair => pair.leftOptionId !== id));
      }
      updatedLeftData = null;
    }
    setActiveLeftData(updatedLeftData);
  };

  const handleRightOptionPress = (id: number) => () => {
    if (activeLeftData) {
      const updatedPairs = pairs.filter(pair => pair.rightOptionId !== id);
      const { id: leftOptionId, colorData } = activeLeftData;
      updatedPairs.push({
        colorData,
        leftOptionId,
        rightOptionId: id,
      });
      setPairs(updatedPairs);
      setActiveLeftData(null);
    } else {
      const isPairPresent = pairs.find(pair => pair.rightOptionId === id);
      if (isPairPresent) {
        setPairs(pairs.filter(pair => pair.rightOptionId !== id));
      } else {
        const updatedPairs = [...pairs];
        const lastPair = updatedPairs[updatedPairs.length - 1];
        updatedPairs[updatedPairs.length - 1] = {
          ...lastPair,
          rightOptionId: id,
        };
        setPairs(updatedPairs);
      }
    }
  };

  const handleSubmit = () => {
    const formattedPairs: Record<number, number> = {};
    pairs.forEach(pair => {
      formattedPairs[pair.leftOptionId] = pair.rightOptionId;
    });

    handleSubmitPress(formattedPairs);
  };

  const renderColumn = (isLeftColumn: boolean) => {
    const data = isLeftColumn ? columnA : columnB;
    const handleOptionPress = isLeftColumn ? handleLeftOptionPress : handleRightOptionPress;

    return data.map((option, index) => {
      const {
        backgroundColor = '',
        borderColor = '',
        color = '',
      } = getColors(isLeftColumn, option.id) || {};

      const containerStyle = {
        backgroundColor,
        borderColor,
      };

      const titleStyle = { color };

      return (
        <div
          className="match-columns__option"
          key={data[index].id}
          onClick={handleOptionPress(option.id)}
          style={containerStyle}>
          <Typography className="match-columns__option-title" style={titleStyle}>
            {option.value}
          </Typography>
        </div>
      );
    });
  };

  return (
    <div id={MasteryGamesPreset.MatchColumns} className="match-columns__container">
      <Typography className="match-columns__title">
        {translate('screens.product-demo.challenges.mastery.games.match-columns.title')}
      </Typography>
      <div className="match-columns__sub-container">
        <div className="match-columns__column">{renderColumn(true)}</div>
        <div className="match-columns__column">{renderColumn(false)}</div>
      </div>
      <CustomButton
        buttonContainerClassName="match-columns__button"
        disabled={isButtonDisabled}
        isLoading={showLoader}
        label={translate('common.continue')}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default MatchColumns;
