import React from 'react';

import { QuoteIcon } from 'assets';

import { Typography } from '@mui/material';

import './userTestimonialCard-styles.scss';

interface IUserTestimonialCardProps {
  backgroundColor: string;
  className: string;
  companyImage?: string;
  companyLogo?: React.ElementType;
  designation: string;
  name: string;
  testimonial: string;
}

export const UserTestimonialCard = (props: IUserTestimonialCardProps) => {
  const {
    backgroundColor,
    className,
    companyImage,
    companyLogo: Icon,
    designation,
    name,
    testimonial,
  } = props;

  const subContainerStyle = className.includes('accenture-icon')
    ? { alignItems: 'flex-end', justifyContent: 'space-between' }
    : { alignItems: 'center', justifyContent: 'space-between' };

  return (
    <div className="user-testimonial-card__container" style={{ backgroundColor }}>
      <QuoteIcon className="user-testimonial-card__icon" />
      <Typography className="user-testimonial-card__testimonial">{testimonial}</Typography>
      <div className="user-testimonial-card__sub-container" style={subContainerStyle}>
        <div className="user-testimonial-card__designation-container">
          <Typography className="user-testimonial-card__name">{name}</Typography>
          <Typography className="user-testimonial-card__designation">{designation}</Typography>
        </div>
        {!!Icon ? (
          <Icon className={`${className}`} />
        ) : (
          <img alt="company-image" className={`${className}`} src={companyImage} loading="lazy" />
        )}
      </div>
    </div>
  );
};

export default UserTestimonialCard;
