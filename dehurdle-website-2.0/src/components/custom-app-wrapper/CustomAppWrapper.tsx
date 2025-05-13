import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CustomAppBar, CustomFooter } from 'components';
import { CustomAppWrapperPreset, NAV_ITEMS } from 'constant';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './customAppWrapper-styles.scss';

interface ICustomAppWrapperProps {
  /** children : is a required prop that gives the children to be rendered */
  children: React.ReactNode;
  /** isQuizFlow: is an optional prop that states whether it's quiz/assesssment flow or not.*/
  isQuizFlow?: boolean;
  /** preset: is a optional prop that gives the preset to be used */
  preset?: CustomAppWrapperPreset;
}

const CustomAppWrapper = (props: ICustomAppWrapperProps) => {
  const { children, isQuizFlow = false, preset = CustomAppWrapperPreset.Default } = props;

  const { pathname } = useLocation();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  const exceptionHeightInVH = ((headerHeight + footerHeight) * 100) / window.innerHeight;

  const getHeaderHeight = useCallback((height: number, type: string) => {
    if (type === 'header') {
      setHeaderHeight(height);
    } else {
      setFooterHeight(height);
    }
  }, []);

  const handleReload = () => {
    // if (initialWidth !== window.innerWidth && isDesktop) {
    //   window.location.reload();
    // }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const handleLoad = () => {
      gsap.delayedCall(0.1, () => {
        ScrollTrigger.refresh();
        window.scrollTo(0, 0);
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    window.addEventListener('resize', handleReload);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleReload);
    };
  }, [pathname]);

  return (
    <>
      <CustomAppBar
        navItems={NAV_ITEMS}
        preset={preset}
        getHeight={height => getHeaderHeight(height, 'header')}
      />
      <div
        style={{ minHeight: `calc(100vh - ${exceptionHeightInVH}vh` }}
        className={isQuizFlow ? 'custom-app-wrapper__container' : ''}>
        {children}
      </div>
      <CustomFooter preset={preset} getHeight={height => getHeaderHeight(height, 'footer')} />
    </>
  );
};

export default CustomAppWrapper;
