import { GAMIFICATION_CARD_DATA } from 'constant';
import { translate } from 'locales';

import './gamification-styles.scss';

const Gamification = () => {
  return (
    <div className="gamification__container">
      <div className="gamification__heading">
        {translate('screens.product-demo.gamification.title')}
      </div>
      <div className="gamification__sub-container">
        {GAMIFICATION_CARD_DATA.map(cardData => {
          const { background, description, headerColor, id, image, title } = cardData;

          return (
            <div className="gamification__card" style={{ background }} key={id}>
              <div className="gamification__card-title" style={{ color: headerColor }}>
                {title}
              </div>
              <div className="gamification__card-description">{description}</div>
              <img alt={title} className="gamification__card-image" src={image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gamification;
