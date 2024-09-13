import type {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from '@remix-run/node';
import {createRemixStub} from '@remix-run/testing';
import {addons} from '@storybook/preview-api';
import type {ReactRenderer} from '@storybook/react';
import type {PartialStoryFn} from '@storybook/types';

const methods = ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'];
type Method = (typeof methods)[number];
type SimpleAction = Partial<Record<Method, string>>;

type Action = ActionFunction | SimpleAction | string;

type Routes = {path: string; storyId: string}[];

type RemixDecoratorOptions = {
  action?: Action;
  loader?: (args: LoaderFunctionArgs) => Promise<unknown>;
  path?: string;
  routes?: Routes;
};

const channel = addons.getChannel();

const getAction = (action?: Action) => {
  if (!action) {
    return undefined;
  }

  // Simple - Any call to the action will select the story
  if (typeof action === 'string') {
    return () => {
      channel.emit('selectStory', {storyId: action});

      return null;
    };
  }

  // Advanced - Call a remix ActionFunction, and if it returns {storyId} select the story
  if (typeof action === 'function') {
    return async (args: ActionFunctionArgs) => {
      const result = await action(args);

      if (
        typeof result === 'object' &&
        result !== null &&
        'storyId' in result &&
        typeof result.storyId === 'string' &&
        result.storyId.length > 0
      ) {
        channel.emit('selectStory', {storyId: result.storyId});

        return null;
      }

      return result;
    };
  }

  // Intermediate - Assign different storyIds to different methods
  if (
    typeof action === 'object' &&
    Object.keys(action).some((key) => methods.includes(key))
  ) {
    return ({request}: ActionFunctionArgs) => {
      if (action[request.method]) {
        channel.emit('selectStory', {storyId: action[request.method]});
      }

      return null;
    };
  }

  return undefined;
};

const decorator =
  (options?: RemixDecoratorOptions) =>
  (Story: PartialStoryFn<ReactRenderer>) => {
    const {action, path = '/', routes = [], ...rest} = options ?? {};

    const remixStub = createRemixStub([
      {
        action: getAction(action),
        Component: () => <Story />,
        ...rest,
        path,
      },
      // loading different routes will select different stories
      ...routes.map((route) => ({
        Component: () => <Story />,
        ...rest,
        loader: async () => {
          channel.emit('selectStory', {storyId: route.storyId});

          return null;
        },
        path: route.path,
      })),
    ]);

    return remixStub({initialEntries: [path]});
  };

export default decorator;
