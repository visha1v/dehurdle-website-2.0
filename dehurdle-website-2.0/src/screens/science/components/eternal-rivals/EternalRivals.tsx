import { useMemo } from 'react';

import {
  LeftCloudImage,
  RightCloudImage,
  ScienceWreckerImage,
  ScienceWreckerMobileImage,
} from 'assets';
import { useViewport } from 'hooks';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './eternalRivals-styles.scss';

const EternalRivals = () => {
  // We can use the useViewport hook with a min-width: 1200px breakpoint to check if the screen is a desktop, matching the same breakpoint used in the CSS file.
  const { isDesktop } = useViewport();

  const renderHeader = useMemo(() => {
    return (
      <div className="eternal-rivals__header">
        <Typography className="eternal-rivals__heading">
          {translate('screens.science.eternal-rivals.heading')}
          <Typography className="eternal-rivals__heading">
            {translate('screens.science.eternal-rivals.sub-heading')}
          </Typography>
        </Typography>

        <div className="eternal-rivals__header-content-container">
          <Typography className="eternal-rivals__header-content">
            {translate('screens.science.eternal-rivals.header-content-description')}
          </Typography>
        </div>
      </div>
    );
  }, []);

  const renderFooter = useMemo(() => {
    return (
      <div className="eternal-rivals__footer-content">
        <Typography className="eternal-rivals__header-content">
          {translate('screens.science.eternal-rivals.footer-content-heading')}
        </Typography>
      </div>
    );
  }, []);

  const renderBody = useMemo(() => {
    return (
      <div className="eternal-rivals__body">
        <LeftCloudImage className="eternal-rivals__left-cloud" />
        <RightCloudImage className="eternal-rivals__right-cloud" />
        <img
          src={isDesktop ? ScienceWreckerImage : ScienceWreckerMobileImage}
          alt="Science Wrecker"
          className="eternal-rivals__image"
        />
        {renderFooter}
      </div>
    );
  }, []);

  return (
    <div className="eternal-rivals__container">
      {renderHeader}
      {renderBody}
    </div>
  );
};

export default EternalRivals;
