import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppStoreImage, Logo, PlayStoreImage } from 'assets';
import CustomButton from 'components/custom-button/CustomButton';
import {
  API,
  ApiStatusPreset,
  CustomAppWrapperPreset,
  DEBOUNCE_TIME,
  EMAIL_REGEX,
  ICON_COMPONENTS,
  INFO_ITEMS,
  ROUTES,
  SOCIAL_MEDIA_ICONS,
  ToastPreset,
  WEB_URL,
  appConfig,
} from 'constant';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import { getToastMessage, onStoreClick } from 'utils';

import { IconButton, Typography } from '@mui/material';

import './customFooter-styles.scss';

interface ICustomFooterProps {
  preset?: CustomAppWrapperPreset;
  getHeight?: (height: number) => void;
}

const CustomFooter = (props: ICustomFooterProps) => {
  const { getHeight, preset = CustomAppWrapperPreset.Default } = props;
  const { viewStore, applicationStore } = useStore();
  const { submitSubscriptionEmail } = applicationStore;
  const { toastStore, apiStatusStore } = viewStore;
  const { getApiStatus, setApiStatus } = apiStatusStore;
  const { isLoading, error } = getApiStatus(ApiStatusPreset.SubmitSubscriptionEmail) || {};
  const { popToast } = toastStore;

  const [email, setEmail] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDefault = preset === CustomAppWrapperPreset.Default;

  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formattedEmail = email.trim();
      if (EMAIL_REGEX.test(formattedEmail)) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          const successCallback = () => {
            popToast({
              type: ToastPreset.Success,
              title: translate('footer.success-message'),
            });
            setEmail('');
          };
          submitSubscriptionEmail({ email: formattedEmail }, successCallback);
        }, DEBOUNCE_TIME);
      } else {
        popToast({ type: ToastPreset.Error, title: translate('footer.error-message') });
      }
    },
    [email],
  );

  const onFooterInfoClick = (url: string) => () => {
    window.open(`${API.publicCdnUrl}${url}`, '_blank');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (error?.code) {
      popToast({
        type: ToastPreset.Warning,
        title: getToastMessage(error.code),
      });
      setApiStatus({ id: ApiStatusPreset.SubmitSubscriptionEmail, error: null });
    }
  }, [error]);

  const onInfoItemClick = (text: string, icon: string) => () => {
    if (icon === INFO_ITEMS[1].icon) {
      window.location.href = `mailto:${translate(text)}`;
    } else if (icon === INFO_ITEMS[2].icon) {
      window.location.href = `tel:${translate(text)}`;
    }
  };

  const renderInfoItems = useMemo(
    () =>
      INFO_ITEMS.map(({ icon, text }) => {
        const IconComponent = ICON_COMPONENTS[icon];

        return (
          <div key={text} className="footer__info-item">
            <IconButton
              className={`${icon === INFO_ITEMS[0].icon && 'footer__info-location'}`}
              onClick={onInfoItemClick(text, icon)}
              disableRipple>
              <IconComponent />
            </IconButton>
            <Typography
              className={`footer__info-text ${icon === INFO_ITEMS[0].icon && 'footer__info-location-text'}`}
              onClick={onInfoItemClick(text, icon)}>
              {translate(text)}
            </Typography>
          </div>
        );
      }),
    [],
  );

  const renderSocialMediaIcons = useMemo(
    () => (
      <div className="footer__social-media-container">
        {SOCIAL_MEDIA_ICONS.map(({ Icon, key, url }) => (
          <a
            className="footer__social-media-icon"
            href={url}
            key={key}
            rel="noreferrer"
            target="_blank">
            <Icon className="footer__social-icon" />
          </a>
        ))}
      </div>
    ),
    [],
  );

  useEffect(() => {
    if (getHeight) {
      getHeight(containerRef.current?.offsetHeight || 0);
    }
  }, []);

  return (
    <footer className="footer__container" ref={containerRef}>
      {isDefault ? (
        <div className="footer__sub-container">
          <div className="footer__main-section">
            <Logo className="footer__logo" />
            <div className="footer__details">
              <Typography className="footer__heading">{translate('footer.header')}</Typography>
              <form className="footer__form" onSubmit={handleSubmit}>
                <input
                  className="footer__input"
                  name="email"
                  onChange={handleEmailChange}
                  placeholder={translate('footer.enter-email')}
                  required
                  type="text"
                  value={email}
                />
                <button type="submit" className="footer__button">
                  {isLoading ? (
                    <div className="footer__loader" />
                  ) : (
                    <Typography className="footer__button-title">
                      {translate('footer.submit')}
                    </Typography>
                  )}
                </button>
              </form>
              {currentPath !== ROUTES.REQUEST_DEMO && (
                <CustomButton
                  buttonContainerClassName="footer__request-demo-button"
                  label={translate('screens.demo.request-demo')}
                  onClick={() => {
                    navigate(ROUTES.REQUEST_DEMO);
                  }}
                />
              )}
            </div>
          </div>
          <div className="footer__info-container">
            <div className="footer__info-list-container">
              <Typography
                className="footer__info-text footer__info-title upper-case"
                onClick={onFooterInfoClick(WEB_URL.PrivacyPolicy)}>
                {translate('footer.privacy-policy')}
              </Typography>
              <Typography
                className="footer__info-text footer__info-title upper-case"
                onClick={onFooterInfoClick(WEB_URL.TermsAndCondition)}>
                {translate('footer.termsAndConditions')}
              </Typography>
            </div>
            <div className="footer__info-list">{renderInfoItems}</div>
          </div>
        </div>
      ) : null}
      <div
        className={`footer__copyright ${preset === CustomAppWrapperPreset.Quiz && 'footer__bottom-container'}`}>
        <Typography className="footer__legal-text">{translate('footer.copyright')}</Typography>
        <div className="footer__social-media">
          {renderSocialMediaIcons}
          <div className="footer__store">
            <IconButton
              className="footer__store-icon"
              onClick={onStoreClick(appConfig.APP_STORE.playStore)}>
              <PlayStoreImage />
            </IconButton>
            <IconButton
              className="footer__store-icon"
              onClick={onStoreClick(appConfig.APP_STORE.appleStore)}>
              <AppStoreImage />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(observer(CustomFooter));
