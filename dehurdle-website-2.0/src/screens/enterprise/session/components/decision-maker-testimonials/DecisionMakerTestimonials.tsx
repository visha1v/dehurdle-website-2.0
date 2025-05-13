import { BlueStarImage, PinkStarImage, QuoteImage } from 'assets';
import { MAKERS_TESTIMONIALS } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import './decisionMakerTestimonials-styles.scss';

const DecisionMakerTestimonials = () => {
  const renderTestimonialCard = () => {
    return MAKERS_TESTIMONIALS.map(item => {
      const { description, key, title } = item;

      return (
        <div key={key} className="decision-maker-testimonials__testimonial-container">
          <QuoteImage className="decision-maker-testimonials__quote" />
          <Typography className="decision-maker-testimonials__description">{`"${description}"`}</Typography>
          <Typography className="decision-maker-testimonials__title">{title}</Typography>
        </div>
      );
    });
  };

  return (
    <div className="decision-maker-testimonials__container">
      <BlueStarImage className="decision-maker-testimonials__blue-star" />
      <Typography className="decision-maker-testimonials__heading">
        {translate('screens.enterprise.session.decision-maker-testimonials.heading')}
      </Typography>
      <PinkStarImage className="decision-maker-testimonials__pink-star" />
      <div className="decision-maker-testimonials__sub-container">{renderTestimonialCard()}</div>
    </div>
  );
};

export default DecisionMakerTestimonials;
