import gaiaApi from './gaia';

let apiLanguage: string;

export const setApiLanguage = (language: string) => {
  if (apiLanguage !== language) {
    apiLanguage = language;
    gaiaApi.setAcceptLanguage(language);
  }
};
