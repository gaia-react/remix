import {useTranslation} from 'react-i18next';
import type {Meta, StoryFn} from '@storybook/react';
import database from 'test/mocks/database';
import faker from 'test/mocks/faker';
import stubs from 'test/stubs';
import type {Language} from '~/languages';
import {ThingsProvider} from '~/services/api/things/state';
import type {Thing} from '~/services/api/things/types';
import {toCamelCase} from '~/utils/object';
import {toInitialCap} from '~/utils/string';
import ThingsGrid from '../index';

const meta: Meta = {
  component: ThingsGrid,
  decorators: [stubs.remix()],
  parameters: {
    chromatic: {viewports: [1280, 412]},
    controls: {hideNoControlsWarning: true},
    wrap: 'p-4',
  },
  title: 'Components/ThingsGrid',
};

export default meta;

export const Default: StoryFn = () => {
  const {
    i18n: {language},
  } = useTranslation();

  const things = database[language as Language].things
    .getAll()
    .map(toCamelCase) as Thing[];

  return (
    <ThingsProvider things={things}>
      <ThingsGrid />
    </ThingsProvider>
  );
};

export const LongStrings: StoryFn = () => {
  const {
    i18n: {language},
  } = useTranslation();

  const things = database[language].things
    .getAll()
    .map((thing) => ({
      ...thing,
      description: toInitialCap(faker[language].lorem.words(30)),
      name: toInitialCap(faker[language].lorem.words(20)),
    }))
    .map(toCamelCase) as Thing[];

  return (
    <ThingsProvider things={things}>
      <ThingsGrid />
    </ThingsProvider>
  );
};

export const NoThings: StoryFn = () => (
  <ThingsProvider things={[]}>
    <ThingsGrid />
  </ThingsProvider>
);
