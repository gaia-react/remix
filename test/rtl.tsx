import {cleanup} from '@testing-library/react';
import {afterEach} from 'vitest';
import '../.storybook/i18next';

afterEach(() => {
  cleanup();
});

// re-export testing library
export * from '@testing-library/react';
