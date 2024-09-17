import {copyFileSync} from 'node:fs';
import path from 'node:path';

const initializeEnvironment = () => {
  const originalFile = path.resolve('.env.example');
  const renamedFile = path.resolve('.env');
  copyFileSync(originalFile, renamedFile);
};

const main = () => {
  initializeEnvironment();
};

export default main;
