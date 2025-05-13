import { BackIcon, CloseIcon } from 'assets';

import './header-styles.scss';

interface IHeader {
  isClose?: boolean;
  onIconClick?: () => void;
  title: string;
}
const Header = (props: IHeader) => {
  const { isClose = false, onIconClick, title } = props;

  const Icon = isClose ? CloseIcon : BackIcon;

  return (
    <div className="header__container">
      <Icon onClick={onIconClick} className="header__icon" />
      <div className="header__title">{title}</div>
      <div />
    </div>
  );
};

export default Header;
