/* eslint-disable unicorn/prefer-module,no-console */
const fs = require('node:fs');

const initializeEnvironment = () => {
  fs.rename('.env.example', '.env', (error) => {
    if (error) {
      console.error('ERROR:', error);
    }
  });
};

const main = () => {
  initializeEnvironment();
};

module.exports = main;
