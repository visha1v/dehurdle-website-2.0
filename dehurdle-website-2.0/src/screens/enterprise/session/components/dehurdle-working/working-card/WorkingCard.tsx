import { ImageAlignment } from 'constant';

import { Typography } from '@mui/material';

import './workingCard-styles.scss';

interface IWorkingCardProps {
  description: string;
  id: number;
  image: string;
  imageAlignment: ImageAlignment;
  title: string;
}

const WorkingCard = (props: IWorkingCardProps) => {
  const { description, id, image, imageAlignment, title } = props;

  return (
    <div
      className={`working-card__container ${
        imageAlignment === ImageAlignment.Right ? 'row-reverse' : ''
      }`}>
      <img alt="" src={image} className="working-card__image" />
      <div>
        <div className="working-card__title-container">
          <Typography className="working-card__title">{`${id}.`}</Typography>
          <Typography className="working-card__title">{title}</Typography>
        </div>
        <Typography className="working-card__description">{description}</Typography>
      </div>
    </div>
  );
};

export default WorkingCard;
