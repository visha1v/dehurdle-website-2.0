import { Fragment, useState } from 'react';

import { CrossIcon, PlusIcon } from 'assets';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { FaqItemType } from 'models';

import './faq-styles.scss';

interface IFqaProps {
  data: Array<FaqItemType>;
  isLoading: boolean;
}

const FAQ = (props: IFqaProps) => {
  const { data, isLoading } = props;

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleOnAccordionClick = (index: number) => {
    let updatedIndex = index;

    if (activeIndex === index) {
      updatedIndex = -1;
    }
    setActiveIndex(updatedIndex);
  };

  const renderFaqCards = () => (
    <div className="faq__sub-container">
      {data.map((faq, index) => {
        const value = index + 1;
        const count = index >= 9 ? value : `${value}`.padStart(2, '0');
        const showContent = activeIndex === index;
        const icon = showContent ? (
          <CrossIcon color={'#178A86'} className="faq__cross-icon" />
        ) : (
          <PlusIcon className="faq__plus-icon" />
        );
        const containerClass = activeIndex === index ? 'faq__accordion-active' : 'faq__accordion';

        return (
          <Fragment key={`${faq.question} - ${index}`}>
            <div className={containerClass} onClick={() => handleOnAccordionClick(index)}>
              <div className="faq__accordion-container">
                <div className="faq__accordion-count">{count}</div>
                <div>
                  <div className="faq__accordion-title">{faq.question}</div>
                  {showContent && <div className="faq__accordion-description">{faq.answer}</div>}
                </div>
              </div>
              {icon}
            </div>
            {index < data.length - 1 && <div className="faq__separator" />}
          </Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="faq__container">
      <div className="faq__title">{translate('screens.product-demo.faq.title')}</div>
      <div className="faq__card-container">
        {isLoading ? <div className="faq__loader" /> : renderFaqCards()}
      </div>
    </div>
  );
};

export default observer(FAQ);
