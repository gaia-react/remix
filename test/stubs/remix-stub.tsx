import type {ActionFunction, LoaderFunctionArgs} from '@remix-run/node';
import {createRemixStub} from '@remix-run/testing';
import type {ReactRenderer} from '@storybook/react';
import type {PartialStoryFn} from '@storybook/types';

type RemixDecoratorOptions = {
  action?: ActionFunction;
  loader?: (args: LoaderFunctionArgs) => Promise<unknown>;
  path?: string;
};

const decorator =
  (options?: RemixDecoratorOptions) =>
  (Story: PartialStoryFn<ReactRenderer>) => {
    const path = options?.path ?? '/';

    const remixStub = createRemixStub([
      {
        Component: () => <Story />,
        ...options,
        path,
      },
    ]);

    return remixStub({initialEntries: [path]});
  };

export default decorator;
