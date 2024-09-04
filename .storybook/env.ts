// @ts-ignore
window.process.env = {
  API_URL: import.meta.env.API_URL,
  MSW_ENABLED: import.meta.env.MSW_ENABLED,
  SESSION_SECRET: import.meta.env.SESSION_SECRET,
  SITE_URL: import.meta.env.SITE_URL,
};
