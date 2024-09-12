import {useTranslation} from 'react-i18next';
import type {Meta, StoryFn} from '@storybook/react';
import database from 'test/mocks/database';
import stubs from 'test/stubs';
import type {Language} from '~/languages';
import type {Thing} from '~/services/api/things/types';
import {toCamelCase} from '~/utils/object';
import ThingPage from '../index';

const meta: Meta = {
  component: ThingPage,
  decorators: [
    stubs.remix({
      action: 'components-thingsgrid--default',
      routes: [{path: '/things', storyId: 'components-thingsgrid--default'}],
    }),
  ],
  parameters: {
    controls: {hideNoControlsWarning: true},
  },
  title: 'Components/ThingEdit',
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
    <div className="p-4">
      <ThingPage thing={things[0]} />
    </div>
  );
};
