import {RemixI18Next} from 'remix-i18next/server';
import i18n from '~/i18n';
import {languageStorage} from '~/sessions.server/language';

const i18next = new RemixI18Next({
  detection: {
    fallbackLanguage: i18n.fallbackLng,
    sessionKey: 'language',
    sessionStorage: languageStorage,
    supportedLanguages: i18n.supportedLngs,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
  },
});

export default i18next;
