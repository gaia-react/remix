import type {Meta, StoryFn} from '@storybook/react';
import stubs from 'test/stubs';
import Checkbox from '../index';

const meta: Meta = {
  component: Checkbox,
  decorators: [stubs.remix()],
  parameters: {
    controls: {hideNoControlsWarning: true},
  },
  title: 'Form/Checkbox',
};

export default meta;

export const Default: StoryFn = () => (
  <div className="max-w-sm space-y-4 p-4">
    <div>
      <Checkbox defaultChecked={true} name="noLabel" />
    </div>
    <hr />
    <div>
      <Checkbox label="Choice" name="normal" />
    </div>
    <hr />
    <div>
      <Checkbox
        label={
          <span>
            This has a{' '}
            <a href="https://www.google.com" rel="noreferrer" target="_blank">
              link
            </a>{' '}
            in it
          </span>
        }
        name="withLink"
      />
    </div>
    <hr />
    <div>
      <Checkbox
        description="This has a description"
        label="Choice"
        name="description"
      />
    </div>
    <hr />
    <div>
      <Checkbox
        error="Required"
        label="Required Invalidated"
        name="required"
        required={true}
      />
    </div>
    <hr />
    <div>
      <Checkbox disabled={true} label="Disabled" name="disabled" />
    </div>
    <hr />
    <div>
      <Checkbox
        defaultChecked={true}
        disabled={true}
        label="Disabled Checked"
        name="disabledChecked"
      />
    </div>
  </div>
);
