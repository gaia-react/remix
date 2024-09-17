/* eslint-disable no-console */
import {rename} from 'node:fs';
import path from 'node:path';

const initializeEnvironment = () => {
  const originalFile = path.resolve('./.env.example');
  const renamedFile = path.resolve('./.env');
  rename(originalFile, renamedFile, (error) => {
    if (error) {
      console.error('ERROR:', error);
    }
  });
};

const main = () => {
  initializeEnvironment();
};

export default main;
