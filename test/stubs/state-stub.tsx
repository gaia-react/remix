/* eslint-disable react/display-name */
import type {ReactRenderer} from '@storybook/react';
import type {PartialStoryFn} from '@storybook/types';
import State from '~/state';
import type {Maybe} from '~/types';

type StateDecoratorProps = {
  example?: Maybe<number>;
};

const decorator =
  (props?: StateDecoratorProps) => (Story: PartialStoryFn<ReactRenderer>) => (
    <State example={props?.example}>
      <Story />
    </State>
  );

export default decorator;
