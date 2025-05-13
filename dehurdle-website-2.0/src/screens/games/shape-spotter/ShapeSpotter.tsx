import React, { SVGProps, useEffect, useRef, useState } from 'react';

import { GameBirdIcon, GameDumbbellIcon, GameStarIcon } from 'assets';
import { CustomButton } from 'components';
import { GameState, ResultStatus, SPACE } from 'constant';
import { translate } from 'locales';
import { IShapeSpotterDataType, IShapeSpotterResponseJsonItem } from 'types';

import { Typography } from '@mui/material';

import GameHeader from '../game-header/GameHeader';

import CountdownBar from './countdown-bar/CountdownBar';
import './shape-spotter-styles.scss';

interface IShapeSpotterProps {
  gameName: string;
  responseJson: IShapeSpotterResponseJsonItem;
  setCurrentScreen: React.Dispatch<React.SetStateAction<GameState>>;
  setGameResult: React.Dispatch<React.SetStateAction<ResultStatus>>;
}
const ShapeSpotter = (props: IShapeSpotterProps) => {
  const { gameName, responseJson, setCurrentScreen, setGameResult } = props;
  const { colors, shapesId: shapeIds, gameTimer, qualificationPercentage } = responseJson;

  const [gridData, setGridData] = useState<Array<Array<IShapeSpotterDataType>>>([]);
  const [timer, setTimer] = useState(gameTimer);

  const selectedTilesRef = useRef<Array<IShapeSpotterDataType>>([]);
  const targetTileRef = useRef<IShapeSpotterDataType | null>(null);
  const totalCorrectOccurrencesRef = useRef(0);

  const shapeIcons: Record<number, React.FC<SVGProps<SVGSVGElement>>> = {
    1: GameBirdIcon,
    2: GameStarIcon,
    3: GameDumbbellIcon,
  };

  const getShape = (id: number) => shapeIcons[id];

  const generateGrid = () => {
    const { rows, cols } = responseJson;
    const grid = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => {
        const shapeId = shapeIds[Math.floor(Math.random() * shapeIds.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return { id: `${rowIndex}-${colIndex}`, shapeId, color };
      }),
    );

    return grid;
  };

  const initializeGame = () => {
    const grid = generateGrid().map(row =>
      row.map(cell => ({
        ...cell,
        isDisabled: false,
      })),
    );

    setGridData(grid);
    setTimer(gameTimer);

    const flatData = grid.flat();

    selectedTilesRef.current = [];
    targetTileRef.current = flatData[Math.floor(Math.random() * flatData.length)];
    totalCorrectOccurrencesRef.current = flatData.filter(
      cell =>
        cell.shapeId === targetTileRef.current?.shapeId &&
        cell.color === targetTileRef.current?.color,
    ).length;
  };

  const handleTilePress = (rowIndex: number, colIndex: number) => () => {
    const newData = [...gridData];
    const pressedTile = newData[rowIndex][colIndex];

    newData[rowIndex][colIndex] = {
      ...pressedTile,
      isDisabled: true,
    };

    setGridData(newData);
    selectedTilesRef.current.push(pressedTile);
  };

  const renderGrid = () => {
    return gridData.map((row, rowIndex) => {
      const isFirstRow = !rowIndex;
      const isLastRow = rowIndex === gridData.length - 1;

      const calculateTileSize = () => {
        // TODO: instead of using 300 here, need to use the device width of the phone
        const tileDimension = (300 - 32 - 20 * responseJson.cols) / responseJson.cols;
        return tileDimension;
      };

      const tileDimension = calculateTileSize();
      const iconDimension = tileDimension * 0.7;

      return (
        <div
          key={`${row}-${rowIndex}`}
          className={`shape-spotter__row ${isFirstRow ? 'shape-spotter__first-row' : ''} ${isLastRow ? 'shape-spotter__last-row' : ''}`}>
          {row.map((cell, colIndex) => {
            const { color, id, shapeId, isDisabled } = cell;
            const iconColor = isDisabled ? '#768c9a' : color;
            const Icon = getShape(shapeId);

            return (
              <div
                className={`shape-spotter__game-tile ${isDisabled ? 'shape-spotter__game-tile-inactive' : 'shape-spotter__game-tile-active'}`}
                key={id}
                onClick={handleTilePress(rowIndex, colIndex)}
                style={{
                  width: tileDimension,
                  height: tileDimension,
                }}>
                <Icon color={iconColor} height={iconDimension} width={iconDimension} />
              </div>
            );
          })}
        </div>
      );
    });
  };

  const onRestartPress = () => {
    initializeGame();
  };

  const onCloseClick = () => {
    setCurrentScreen(GameState.Intro);
  };

  const onGameEnd = () => {
    let matchedTiles = 0;
    let result = ResultStatus.Win;

    for (const tile of selectedTilesRef.current) {
      if (
        tile.shapeId !== targetTileRef.current?.shapeId ||
        tile.color !== targetTileRef.current?.color
      ) {
        result = ResultStatus.Lose;
        break;
      }
      matchedTiles++;
    }

    const matchPercentage = (matchedTiles / totalCorrectOccurrencesRef.current) * 100;

    if (result === ResultStatus.Win) {
      result = matchPercentage >= qualificationPercentage ? ResultStatus.Win : ResultStatus.Lose;
    }
    setGameResult(result);
    setCurrentScreen(GameState.Result);
  };

  useEffect(() => {
    let timerId: number | null = null;

    if (timer > 0) {
      timerId = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      onGameEnd();
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timer]);

  useEffect(() => {
    initializeGame();
  }, []);

  const Icon = targetTileRef.current && getShape(targetTileRef.current.shapeId);

  const renderTargetTile = () => {
    return (
      <div className="shape-spotter__content-container">
        <div className="shape-spotter__content-sub-container">
          <Typography className="shape-spotter__title">
            {translate('screens.product-demo.challenges.shape-spotter.description')}
            <span className="shape-spotter__title" style={{ color: targetTileRef.current?.color }}>
              {`${SPACE}${translate('screens.product-demo.challenges.shape-spotter.sub-description')}`}
            </span>
          </Typography>
        </div>
        {targetTileRef.current && (
          <div className="shape-spotter__main-container">
            {Icon && <Icon color={targetTileRef.current.color} className="shape-spotter__icon" />}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="shape-spotter__container">
        <div>
          <GameHeader onClick={onCloseClick} gameName={gameName} />
          <div>
            {renderTargetTile()}
            <div className="shape-spotter__sub-container">
              <div className="shape-spotter__header-container">
                <div className="shape-spotter__header-sub-container">
                  <Typography className="shape-spotter__header-title">
                    {translate('common.time-remaining')}
                  </Typography>
                  <Typography className="shape-spotter__header-sub-title">{`${timer}${translate('common.seconds')}`}</Typography>
                </div>
                <div
                  className="shape-spotter__header-description-container"
                  onClick={onRestartPress}>
                  <Typography className="shape-spotter__header-description">
                    {translate('common.restart-game')}
                  </Typography>
                </div>
              </div>
              <CountdownBar timeRemaining={timer} totalTime={gameTimer} />
              <div className="shape-spotter__grid">{renderGrid()}</div>
            </div>
          </div>
        </div>
        <CustomButton
          buttonContainerClassName="shape-spotter__button"
          label={translate('common.continue')}
          onClick={onGameEnd}
        />
      </div>
    </>
  );
};

export default ShapeSpotter;
