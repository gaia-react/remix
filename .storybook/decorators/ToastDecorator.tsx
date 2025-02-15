import type {ReactRenderer} from '@storybook/react';
import type {DecoratorFunction} from '@storybook/types';
import Toast from '~/components/Toast';

const ToastDecorator: DecoratorFunction<ReactRenderer> = (storyFn) => (
  <>
    {storyFn()}
    <Toast />
  </>
);

export default ToastDecorator;
