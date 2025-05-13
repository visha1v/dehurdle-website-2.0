import { useLayoutEffect, useMemo, useRef } from 'react';

import { CustomLottie } from 'components';
import { AppEnv, DEV_PDF_LINK, PROD_PDF_LINK, WRECKER_CARD_DATA } from 'constant';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { translate } from 'locales';
import spacing from 'theme/spacing';

import { Typography } from '@mui/material';

import './theWreckers-style.scss';

gsap.registerPlugin(ScrollTrigger);

interface IWreckerCard {
  title: string;
  description: string;
  image: any;
}

const TheWreckers = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const isDesktop = useMemo(() => window.innerWidth >= 1024, []);
  const CONTAINER_CLASS_NAME = isDesktop
    ? 'the-wreckers__desktop-container'
    : 'the-wreckers__container';

  const renderCard = ({ title, description, image }: IWreckerCard) => (
    <div className="the-wreckers__card-container" key={title}>
      <div className="the-wreckers__card-text-container">
        <Typography className="the-wreckers__card-title">{title}</Typography>
        <Typography className="the-wreckers__card-desc">{description}</Typography>
      </div>
      <CustomLottie
        lottieSource={image}
        style={{
          height: spacing.Spacing_300,
          width: spacing.Spacing_300,
        }}
      />
    </div>
  );

  const pdfLink = import.meta.env.VITE_APP_ENV === AppEnv.Prod ? PROD_PDF_LINK : DEV_PDF_LINK;

  useLayoutEffect(() => {
    const container = scrollContainer.current;
    if (!isDesktop || !container) return;

    const scrollContentWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;
    const xPercent = -((scrollContentWidth - containerWidth) / containerWidth) * 100;
    const ctx = gsap.context(() => {
      gsap.to(container, {
        xPercent: xPercent - 5,
        scrollBehavior: 'smooth',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: true,
          end: `+=${scrollContentWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => {
      ctx.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDesktop]);

  return (
    <div ref={scrollContainer} className={CONTAINER_CLASS_NAME}>
      <div className="the-wreckers__text-container">
        <Typography className="the-wreckers__title">
          {translate('screens.wreckers.the-wreckers.title')}
        </Typography>
        <div className="the-wreckers__text-sub-container">
          <Typography className="the-wreckers__description">
            {translate('screens.wreckers.the-wreckers.description')}
          </Typography>
          <a
            href={pdfLink}
            className="the-wreckers__learn-more"
            download="user-cases"
            target="_blank"
            rel="noreferrer">
            {translate('screens.wreckers.the-wreckers.learn-more')}
          </a>
        </div>
      </div>
      <div className="the-wreckers__card-wrapper">
        {WRECKER_CARD_DATA.map(({ title, description, image }) =>
          renderCard({ title, description, image }),
        )}
      </div>
    </div>
  );
};

TheWreckers.displayName = 'TheWreckers';

export default TheWreckers;
