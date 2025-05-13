import { USER_TESTIMONIALS_DATA } from 'constant';
import { translate } from 'locales';

import { Typography } from '@mui/material';

import Carousel from './carousel/Carousel';
import UserTestimonialCard from './user-testimonial-card/UserTestimonialCard';
import './userTestimonials-styles.scss';

const UserTestimonials = () => {
  const renderCards = () => {
    return USER_TESTIMONIALS_DATA.map(item => {
      return <UserTestimonialCard key={item.id} {...item} />;
    });
  };

  return (
    <div className="user-testimonials__container">
      <Typography className="user-testimonials__title">
        {translate('screens.enterprise.session.user-testimonials.title')}
      </Typography>
      <div className="user-testimonials__sub-container">{renderCards()}</div>
      <div className="user-testimonials__carousel-container">
        <Carousel data={USER_TESTIMONIALS_DATA} />
      </div>
    </div>
  );
};

export default UserTestimonials;
