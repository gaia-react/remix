import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {redirectWithInfo} from 'remix-toast';
import i18next from '~/i18next.server';
import ThingPage from '~/pages/Public/Things/ThingPage';
import {attempt} from '~/services/api/helpers';
import {api} from '~/services/index.server';

export const action: ActionFunction = async ({request}) => {
  if (request.method === 'PUT') {
    const formData = await request.formData();

    const [error] = await attempt(async () =>
      api.gaia.things.updateThing(formData)
    );

    const t = await i18next.getFixedT(request, 'pages');

    if (error) {
      return json({error: t('things.duplicateName')}, error);
    }

    return redirectWithInfo('/things', t('things.thingUpdated'), {status: 303});
  }

  return json(null, {status: 400});
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  const thing = await api.gaia.things.getThingById(params.id!);

  return json({thing});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.thing.name},
  {
    content: data?.thing.description,
    name: 'description',
  },
];

const ThingRoute = () => {
  const {thing} = useLoaderData<typeof loader>();

  return <ThingPage thing={thing} />;
};

export default ThingRoute;
