import {installGlobals} from '@remix-run/node';
import type {Preview} from '@storybook/react';
import {setProjectAnnotations} from '@storybook/react';
import * as globalStorybookConfig from '../.storybook/preview';
import '@testing-library/jest-dom/vitest';
import './test.server';

installGlobals();

setProjectAnnotations(globalStorybookConfig as Preview);
