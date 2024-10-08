/* eslint-disable no-console,sonarjs/no-os-command-from-path */
import {execSync} from 'node:child_process';
import {rename, unlinkSync} from 'node:fs';
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

const initializeHuskyAndPlaywright = (rootDirectory) => {
  execSync('npm run prepare', {
    cwd: path.join(rootDirectory, '/'),
    stdio: 'inherit',
  });
};

const cleanup = (rootDirectory) => {
  unlinkSync(path.join(rootDirectory, '.github/CODEOWNERS'));
  unlinkSync(path.join(rootDirectory, '.github/FUNDING.yml'));
};

const main = async ({rootDirectory}) => {
  renameEnvironmentFile(rootDirectory);
  initializeHuskyAndPlaywright(rootDirectory);
  cleanup(rootDirectory);
};

export default main;
