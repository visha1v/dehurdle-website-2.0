import palette from 'theme/colors';

import './countdown-styles.scss';

interface ICustomCountdownBarProps {
  timeRemaining: number;
  totalTime: number;
}

const CountdownBar = (props: ICustomCountdownBarProps) => {
  const { timeRemaining, totalTime } = props;

  const progressPercentage = (timeRemaining / totalTime) * 100;
  const oneThird = totalTime / 3;
  let progressColor = palette.fruitSaladGreen;

  if (timeRemaining <= oneThird * 2 && timeRemaining > oneThird) {
    progressColor = palette.gorse;
  } else if (timeRemaining <= oneThird) {
    progressColor = palette.coralRed;
  }

  return (
    <div className="countdown-bar__container">
      <div
        className="countdown-bar__sub-container"
        style={{ backgroundColor: progressColor, width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default CountdownBar;
