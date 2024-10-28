import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {json} from '@remix-run/node';
import {redirectWithSuccess} from 'remix-toast';
import i18next from '~/i18next.server';
import CreateThingPage from '~/pages/Public/Things/CreateThingPage';
import {attempt} from '~/services/api/helpers';
import {api} from '~/services/index.server';

export const action: ActionFunction = async ({request}) => {
  if (request.method === 'POST') {
    const formData = await request.formData();

    const [error] = await attempt(async () =>
      api.gaia.things.createThing(formData)
    );

    const t = await i18next.getFixedT(request, 'pages');

    if (error) {
      return json({error: t('things.duplicateName')}, error);
    }

    return redirectWithSuccess('/things', t('things.thingCreated'), {
      status: 303,
    });
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
