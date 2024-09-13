import type {Meta, StoryFn} from '@storybook/react';
import SiteVersion from '../index';

const meta: Meta = {
  component: SiteVersion,
  parameters: {
    chromatic: {disableSnapshot: true},
    controls: {hideNoControlsWarning: true},
    wrap: 'p-4',
  },
  title: 'Components/SiteVersion',
};

export default meta;

export const Default: StoryFn = () => <SiteVersion />;
