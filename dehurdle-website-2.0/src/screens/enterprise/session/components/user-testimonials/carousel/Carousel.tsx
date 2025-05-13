import Slider from 'react-slick';

import { CAROUSEL_SETTINGS, UserTestimonialsDataType } from 'constant';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import UserTestimonialCard from '../user-testimonial-card/UserTestimonialCard';

import './carousel-styles.scss';

interface ICarouselProps {
  data: UserTestimonialsDataType;
}

const Carousel = (props: ICarouselProps) => {
  const { data } = props;

  return (
    <Slider {...CAROUSEL_SETTINGS} className="carousel__slider">
      {data.map(item => (
        <UserTestimonialCard
          backgroundColor={item.backgroundColor}
          className={item.className}
          companyImage={item.companyImage}
          companyLogo={item.companyLogo}
          designation={item.designation}
          name={item.name}
          key={item.id}
          testimonial={item.testimonial}
        />
      ))}
    </Slider>
  );
};

export default Carousel;
