import type {ReactRenderer} from '@storybook/react';
import type {DecoratorFunction} from '@storybook/types';

const Wrap: DecoratorFunction<ReactRenderer> = (storyFn, {parameters}) =>
  parameters.wrap ?
    <div className={parameters.wrap}>{storyFn()}</div>
  : storyFn();

export default Wrap;
