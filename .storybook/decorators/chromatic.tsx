import type {ReactRenderer} from '@storybook/react';
import type {DecoratorFunction} from '@storybook/types';

const Chromatic: DecoratorFunction<ReactRenderer> = (storyFn, {parameters}) => (
  <>
    <div
      className="relative bg-white text-grey-900"
      style={{
        minHeight: parameters.chromatic?.excludeDark ? '100vh' : '50vh',
      }}
    >
      {storyFn()}
    </div>
    {!parameters.chromatic?.excludeDark && (
      <div
        className="dark relative bg-grey-900 text-white"
        style={{minHeight: '50vh'}}
      >
        {storyFn()}
      </div>
    )}
  </>
);

export default Chromatic;
