import type {ReactRenderer} from '@storybook/react';
import type {DecoratorFunction} from '@storybook/types';

const WrapDecorator: DecoratorFunction<ReactRenderer> = (
  storyFn,
  {parameters}
) =>
  parameters.wrap ?
    <div className={parameters.wrap}>{storyFn()}</div>
  : storyFn();

export default WrapDecorator;
