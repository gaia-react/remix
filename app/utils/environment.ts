export const VERSION = process.env.npm_package_version;

const COMMIT_SHA =
  process.env.COMMIT_SHA ? `-${process.env.COMMIT_SHA.slice(0, 6)}` : '';

export const VERSION_WITH_SHA = `${VERSION}${COMMIT_SHA}`;

const PRODUCTION_DOMAINS = ['https://production-domain.tld'];

export const getApplicationVersion = () =>
  (
    typeof window !== 'undefined' &&
    PRODUCTION_DOMAINS.includes(window.location.origin)
  ) ?
    VERSION
  : VERSION_WITH_SHA;
