// @ts-ignore
window.process.env = {
  API_URL: import.meta.env.API_URL,
  COMMIT_SHA: import.meta.env.COMMIT_SHA,
  MSW_ENABLED: import.meta.env.MSW_ENABLED,
  npm_package_version: import.meta.env.npm_package_version,
  SESSION_SECRET: import.meta.env.SESSION_SECRET,
  SITE_URL: import.meta.env.SITE_URL,
};
