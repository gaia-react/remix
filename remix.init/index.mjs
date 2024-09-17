/* eslint-disable no-console */
import {rename} from 'node:fs';
import path from 'node:path';

const renameEnvironmentFile = (rootDirectory) => {
  const originalFile = path.join(rootDirectory, '.env.example');
  const renamedFile = path.join(rootDirectory, '.env');
  rename(originalFile, renamedFile, (error) => {
    if (error) {
      console.error('ERROR:', error);
    }
  });
};

const main = ({rootDirectory}) => {
  renameEnvironmentFile(rootDirectory);
};

export default main;
