import React from 'react';

import { GmailIcon, InstagramIcon, LinkedInIcon, LocationIcon, PhoneIcon } from 'assets';

const ICON_COMPONENTS: Record<string, React.FC> = {
  pin: LocationIcon,
  gmail: GmailIcon,
  phone: PhoneIcon,
};

const INFO_ITEMS = [
  { icon: 'pin', text: 'footer.location' },
  { icon: 'gmail', text: 'footer.email' },
  { icon: 'phone', text: 'footer.phone' },
];

const SOCIAL_MEDIA_ICONS = [
  { Icon: InstagramIcon, key: 'instagram', url: 'https://www.instagram.com/dehurdle.app/' },
  { Icon: LinkedInIcon, key: 'linkedin', url: 'https://in.linkedin.com/company/dehurdle' },
  // { Icon: YoutubeIcon, key: 'youtube', url: 'https://in.linkedin.com/company/dehurdle' },
];

export { ICON_COMPONENTS, INFO_ITEMS, SOCIAL_MEDIA_ICONS };

export enum WEB_URL {
  PrivacyPolicy = 'privacy_policy/privacy-policy.html',
  TermsAndCondition = 'terms_and_conditions/terms-conditions.html',
}
