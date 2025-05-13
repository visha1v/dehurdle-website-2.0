import { useEffect, useState } from 'react';

import { MarkerIcon } from 'assets';
import { COLOR_MAX_RANGE, COLOR_MIN_RANGE, LocalStorageKeys } from 'constant';
import { useViewport } from 'hooks';
import { translate } from 'locales';
import {
  getAssessmentReportPointerOffset,
  getColorBarMarkerDimension,
  getLocalStorageValue,
} from 'utils';

import { Typography } from '@mui/material';

import './customColorBar-styles.scss';

interface IColorBarProps {
  percentage: number;
}

const CustomColorBar = (props: IColorBarProps) => {
  const { percentage } = props;
  const { isMobile, isTablet } = useViewport();
  const score = Math.round(percentage);

  const rangeOffset = getAssessmentReportPointerOffset(isMobile, isTablet);
  const { scoreProgressColors = [] } = getLocalStorageValue(LocalStorageKeys.ConfigData) || {};
  const barColor = scoreProgressColors[9 - (score === 100 ? 9 : Math.floor(score / 10))];
  const indicatorProgress =
    score === +COLOR_MAX_RANGE
      ? rangeOffset.max
      : score === +COLOR_MIN_RANGE
        ? rangeOffset.min
        : score;
  const [iconDimension, setIconDimension] = useState({
    height: '',
    width: '',
  });

  useEffect(() => {
    const innerWidth = window.innerWidth;
    setIconDimension(getColorBarMarkerDimension(innerWidth));
  }, []);

  return (
    <div className="custom-color-bar">
      <div className="custom-color-bar__progress-container">
        <Typography className="custom-color-bar__max-range">{COLOR_MAX_RANGE}</Typography>
        <div className="custom-color-bar__progress-area">
          <div
            className="custom-color-bar__indicator-container"
            style={{ bottom: `${indicatorProgress}%` }}>
            <div className="custom-color-bar__indicator-sub-container">
              <MarkerIcon color={barColor} style={iconDimension} />
              <Typography className="custom-color-bar__indicator-text">{score}</Typography>
            </div>
            <Typography className="custom-color-bar__indicator-label">
              {translate('common.you')}
            </Typography>
          </div>
        </div>
        <Typography className="custom-color-bar__min-range">{COLOR_MIN_RANGE}</Typography>
      </div>
    </div>
  );
};

export default CustomColorBar;
