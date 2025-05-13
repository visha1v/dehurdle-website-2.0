import './customBullet-styles.scss';

interface ICustomBulletProps {
  description: string;
}

const CustomBullet = (props: ICustomBulletProps) => {
  const { description } = props;

  return (
    <ul className="bullet-container">
      <li>{description}</li>
    </ul>
  );
};

export default CustomBullet;
