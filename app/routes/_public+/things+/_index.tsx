import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {jsonWithError, jsonWithSuccess} from 'remix-toast';
import i18next from '~/i18next.server';
import AllThingsPage from '~/pages/Public/Things/AllThingsPage';
import {attempt} from '~/services/api/helpers';
import {ThingsProvider} from '~/services/gaia/things/state';
import {api} from '~/services/index.server';

export const action: ActionFunction = async ({request}) => {
  if (request.method === 'DELETE') {
    const result = await request.formData();

    const id = result.get('id') as string;

    if (id) {
      const t = await i18next.getFixedT(request, 'pages');

      const [error] = await attempt(async () =>
        api.gaia.things.deleteThing(id)
      );

      if (error) {
        return jsonWithError({result: null}, error.statusText);
      }

      return jsonWithSuccess({result: null}, t('things.thingDeleted'));
    }
  }

  return json(null);
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request, 'pages');
  const title = t('things.meta.title');
  const description = t('things.meta.description');

  const things = await api.gaia.things.getAllThings();

  return json({description, things, title});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
  {
    content: data?.description,
    name: 'description',
  },
];

const ThingsRoute = () => {
  const {things} = useLoaderData<typeof loader>();

  return (
    <ThingsProvider things={things}>
      <AllThingsPage />
    </ThingsProvider>
  );
};

export default ThingsRoute;
