import { CustomButton } from 'components';

import { Typography } from '@mui/material';

import './featureCard-styles.scss';

interface IFeatureCardProps {
  buttonText?: string;
  description: string;
  id?: string;
  image: string;
  imageClassName?: string;
  isImageRightAligned?: boolean;
  onButtonClick?: () => void;
  summary?: string;
  title: string;
}

const FeatureCard = (props: IFeatureCardProps) => {
  const {
    buttonText,
    description,
    id = '',
    image,
    imageClassName = '',
    isImageRightAligned = false,
    onButtonClick = () => {},
    summary,
    title,
  } = props;

  return (
    <div className={`featureCard__container ${isImageRightAligned && 'featureCard__right-image'}`}>
      <img
        src={image}
        alt="section5"
        className={`featureCard__image ${imageClassName}`}
        loading="lazy"
      />
      <div className="featureCard__content">
        <Typography className="featureCard__title">{title}</Typography>
        <Typography className={`featureCard__description featureCard__description-${id}`}>
          {description}
        </Typography>
        <Typography className="featureCard__summary featureCard__description-${id}">
          {summary}
        </Typography>
        {!!buttonText?.length && (
          <CustomButton
            buttonContainerClassName="featureCard__button"
            isCapitalize
            label={buttonText}
            onClick={onButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
