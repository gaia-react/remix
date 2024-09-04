import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {json, redirect} from '@remix-run/node';
import i18next from '~/i18next.server';
import CreateThingPage from '~/pages/Public/Things/CreateThingPage';
import {createThing} from '~/services/api/things/requests.server';

export const action: ActionFunction = async ({request}) => {
  if (request.method === 'POST') {
    const formData = await request.formData();

    await createThing(formData, request);

    return redirect('/things', {status: 303});
  }

  return json(null, {status: 400});
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request, 'pages');
  const title = t('things.meta.title');
  const description = t('things.meta.description');

  return json({description, title});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
  {
    content: data?.description,
    name: 'description',
  },
];

const CreateThingRoute = () => <CreateThingPage />;

export default CreateThingRoute;
