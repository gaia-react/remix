/* eslint-disable unicorn/prefer-module,unicorn/no-anonymous-default-export */
module.exports = async (...args) => {
  const {default: main} = await import('./index.mjs');
  await main(...args);
};
