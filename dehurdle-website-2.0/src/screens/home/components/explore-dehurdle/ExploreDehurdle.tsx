import { useNavigate } from 'react-router-dom';

import { EnterpriseIcon, MicroscopeIcon } from 'assets';
import { ROUTES } from 'constant';
import { translate } from 'locales';
import { ExploreCardType, IExploreDehurdle } from 'types';

import { Typography } from '@mui/material';

import './exploreDehurdle-styles.scss';

const ExploreDehurdle = () => {
  const navigate = useNavigate();

  const onLearnMoreClick = (route: string) => () => {
    navigate(route);
  };

  const renderExploreCard = (params: IExploreDehurdle) => {
    const { icon: Icon, key } = params;
    const isEnterpriseCard = Icon !== MicroscopeIcon;

    const onClick = isEnterpriseCard
      ? onLearnMoreClick(ROUTES.ENTERPRISE)
      : onLearnMoreClick(ROUTES.SCIENCE);

    return (
      <div
        className={`explore-dehurdle__card ${!isEnterpriseCard && 'explore-dehurdle__card__card-border'}`}>
        <Icon height={113} width={112} />
        <Typography className="explore-dehurdle__title">
          {translate(`screens.home.explore-dehurdle.${key}.title`)}
        </Typography>
        <Typography className="explore-dehurdle__description">
          {translate(`screens.home.explore-dehurdle.${key}.description`)}
        </Typography>
        <Typography onClick={onClick} className="explore-dehurdle__learn-more">
          {translate('screens.home.explore-dehurdle.button-title')}
        </Typography>
      </div>
    );
  };

  return (
    <div className="explore-dehurdle__container">
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

export default ExploreDehurdle;
