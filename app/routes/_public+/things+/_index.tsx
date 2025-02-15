import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from 'react-router';
import {useLoaderData} from 'react-router';
import {dataWithError, dataWithSuccess} from 'remix-toast';
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
        return dataWithError({result: null}, error.statusText);
      }

      return dataWithSuccess({result: null}, t('things.thingDeleted'));
    }
  }

  return null;
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request, 'pages');
  const title = t('things.meta.title');
  const description = t('things.meta.description');

  const things = await api.gaia.things.getAllThings();

  return {description, things, title};
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
