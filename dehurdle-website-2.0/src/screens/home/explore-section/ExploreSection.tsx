import { useNavigate } from 'react-router-dom';

import { EnterpriseIcon, MicroscopeIcon } from 'assets';
import { ROUTES } from 'constant';
import { translate } from 'locales';
import { ExploreCardType, IExploreSection } from 'types';

import { Typography } from '@mui/material';

import './exploreSection-styles.scss';

const ExploreSection = () => {
  const navigate = useNavigate();

  const onLearnMoreClick = (route: string) => () => {
    navigate(route);
  };

  const renderExploreCard = (params: IExploreSection) => {
    const { icon: Icon, key } = params;
    const isEnterpriseCard = Icon !== MicroscopeIcon;

    const onClick = isEnterpriseCard
      ? onLearnMoreClick(ROUTES.ENTERPRISE)
      : onLearnMoreClick(ROUTES.SCIENCE);

    return (
      <div
        className={`explore-section__card ${!isEnterpriseCard && 'explore-section__card__card-border'}`}>
        <Icon height={113} width={112} />
        <Typography className="explore-section__title">
          {translate(`screens.home.explore-section.${key}.title`)}
        </Typography>
        <Typography className="explore-section__description">
          {translate(`screens.home.explore-section.${key}.description`)}
        </Typography>
        <Typography onClick={onClick} className="explore-section__learn-more">
          {translate('screens.home.explore-section.button-title')}
        </Typography>
      </div>
    );
  };

  return (
    <div className="explore-section__container">
      {renderExploreCard({
        icon: MicroscopeIcon,
        key: ExploreCardType.Science,
      })}
      {renderExploreCard({
        icon: EnterpriseIcon,
        key: ExploreCardType.Enterprise,
      })}
    </div>
  );
};

export default ExploreSection;
