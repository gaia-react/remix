import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from 'react-router';
import {data} from 'react-router';
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
      return data({error: t('things.duplicateName')}, error);
    }

    return redirectWithSuccess('/things', t('things.thingCreated'), {
      status: 303,
    });
  }

  return data(null, {status: 400});
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request, 'pages');
  const title = t('things.meta.title');
  const description = t('things.meta.description');

  return {description, title};
};

export const meta: MetaFunction<typeof loader> = (loaderData) => [
  {title: loaderData?.data?.title},
  {
    content: loaderData?.data?.description,
    name: 'description',
  },
];

const CreateThingRoute = () => <CreateThingPage />;

export default CreateThingRoute;
