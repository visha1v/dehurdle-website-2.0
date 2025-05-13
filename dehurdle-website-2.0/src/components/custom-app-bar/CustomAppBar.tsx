import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonAnimationLottie, Logo } from 'assets';
import CustomLottie from 'components/custom-lottie/CustomLottie';
import { CustomAppWrapperPreset, ROUTES } from 'constant';
import {
  APP_BAR_BUTTON_LABEL,
  BUTTON_LOTTIE_DIMENSION,
  DrawerPosition,
  DrawerVariant, // ENTERPRISE_OPTIONS,
  HeaderPosition,
} from 'constant/app-bar-constants';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import { INavItems } from 'types';

import CloseIcon from '@mui/icons-material/CloseRounded';
import ExitIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import './customAppBar-styles.scss';

interface ICustomAppBarProps {
  navItems: INavItems[];
  preset?: CustomAppWrapperPreset;
  getHeight?: (height: number) => void;
}

const CustomAppBar = (props: ICustomAppBarProps) => {
  const { navItems, getHeight, preset = CustomAppWrapperPreset.Default } = props;
  const currentPath = window.location.pathname;
  const { domainStore } = useStore();
  const { logoutUser } = domainStore;

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isProductDemo = preset === CustomAppWrapperPreset.Demo;

  const [isAppBarScrolled, setIsAppBarScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const onDrawerToggle = () => {
    setOpenDrawer(prevState => !prevState);
  };

  const onMenuItemClick = (index: number) => () => {
    navigate(navItems[index].route);
  };

  const onRequestDemoClick = () => {
    navigate(ROUTES.REQUEST_DEMO);
  };

  const onScroll = () => {
    const currentScrollPosition = window.scrollY;
    const appBarHeight = (containerRef.current?.clientHeight || 0) + 10;
    if (currentScrollPosition > appBarHeight) {
      setIsAppBarScrolled(true);
    } else {
      setIsAppBarScrolled(false);
    }
  };

  const renderMenuItems = () => {
    return navItems.map((item, index) => {
      const { label, route } = item;

      return (
        <Button
          className={`${currentPath === route && 'custom-app-bar__menu-item'}`}
          key={label}
          disableRipple
          onClick={onMenuItemClick(index)}>
          {label}
        </Button>
      );
    });
  };

  const renderListItems = () => {
    return navItems.map((item, index) => {
      const { label, route } = item;
      return (
        <ListItem
          key={label}
          disablePadding
          className="custom-app-bar__drawer-list-items-container">
          <ListItemButton
            className={`custom-app-bar__drawer-list-items-text-container ${currentPath === route && 'custom-app-bar__drawer-list-items-active'}`}
            disableRipple
            onClick={onMenuItemClick(index)}>
            <ListItemText primary={label} className="custom-app-bar__drawer-list-item-text" />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  const drawer = (
    <div className="custom-app-bar__drawer-sub-container">
      <div className="custom-app-bar__drawer-main-container">
        <List className="custom-app-bar__drawer-list-container">{renderListItems()}</List>
        <button
          className={`custom-app-bar__button-container ${currentPath !== ROUTES.REQUEST_DEMO ? 'active' : ''}`}
          onClick={onRequestDemoClick}>
          <CustomLottie
            lottieSource={ButtonAnimationLottie}
            style={{
              ...BUTTON_LOTTIE_DIMENSION,
              visibility: currentPath !== ROUTES.REQUEST_DEMO ? 'visible' : 'hidden',
            }}
          />
          <Typography
            className={`custom-app-bar__button-text ${currentPath !== ROUTES.REQUEST_DEMO ? 'active' : ''}`}>
            {APP_BAR_BUTTON_LABEL}
          </Typography>
        </button>
      </div>
      <IconButton className="custom-app-bar__drawer-close" onClick={onDrawerToggle}>
        <CloseIcon />
      </IconButton>
    </div>
  );

  const handleExit = () => {
    logoutUser();
    navigate(ROUTES.HOME);
  };

  const renderAppBar = (className = '', positionValue = HeaderPosition.Sticky) => {
    return (
      <AppBar
        className={`custom-app-bar__container custom-app-bar__${className}`}
        position={positionValue}>
        <IconButton onClick={handleExit} disableRipple>
          <Logo className="custom-app-bar__logo" />
        </IconButton>
        {!isProductDemo &&
          (preset === CustomAppWrapperPreset.Default ? (
            <>
              <div className="custom-app-bar__nav-items-container">
                {renderMenuItems()}
                <button
                  className={`custom-app-bar__button-container ${currentPath !== ROUTES.REQUEST_DEMO ? 'active' : ''}`}
                  onClick={onRequestDemoClick}>
                  <CustomLottie
                    lottieSource={ButtonAnimationLottie}
                    style={{
                      ...BUTTON_LOTTIE_DIMENSION,
                      visibility: currentPath !== ROUTES.REQUEST_DEMO ? 'visible' : 'hidden',
                    }}
                  />
                  <Typography
                    className={`custom-app-bar__button-text ${currentPath !== ROUTES.REQUEST_DEMO ? 'active' : ''}`}>
                    {APP_BAR_BUTTON_LABEL}
                  </Typography>
                </button>
              </div>
              <IconButton className="custom-app-bar__menu-icon" onClick={onDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleExit} disableRipple>
              <ExitIcon className="custom-app-bar__exit-icon" />
            </IconButton>
          ))}
      </AppBar>
    );
  };

  useEffect(() => {
    setOpenDrawer(false);
  }, [isLaptop]);

  useEffect(() => {
    if (getHeight) {
      const appBarHeight = containerRef.current?.clientHeight || 0;
      getHeight(appBarHeight);
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="custom-app-bar" ref={containerRef}>
      {renderAppBar()}
      {isAppBarScrolled && renderAppBar('scrolled', HeaderPosition.Fixed)}
      <nav>
        <Drawer
          ModalProps={{
            keepMounted: true,
          }}
          anchor={DrawerPosition.Right}
          className="custom-app-bar__drawer-container"
          onClose={onDrawerToggle}
          open={openDrawer}
          variant={DrawerVariant.Temporary}>
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
};
export default observer(CustomAppBar);
