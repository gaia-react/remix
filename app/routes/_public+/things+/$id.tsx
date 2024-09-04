import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {json, redirect} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ThingPage from '~/pages/Public/Things/ThingPage';
import {getThingById, updateThing} from '~/services/api/things/requests.server';

export const action: ActionFunction = async ({request}) => {
  if (request.method === 'PUT') {
    const formData = await request.formData();

    await updateThing(formData, request);

    return redirect('/things', {status: 303});
  }

  return json(null, {status: 400});
};

export const loader = async ({params, request}: LoaderFunctionArgs) => {
  const thing = await getThingById(params.id!, request);

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
