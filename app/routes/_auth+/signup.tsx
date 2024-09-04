import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {json} from '@remix-run/node';
import i18next from '~/i18next.server';
import SignUpPage from '~/pages/Auth/SignUpPage';
import {requireNoSession} from '~/sessions.server/auth';

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();

  if (!formData.has('email')) {
    return json(null);
  }

  return json({ok: true});
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  await requireNoSession(request);

  const t = await i18next.getFixedT(request);
  const title = t('signup.title', {ns: 'auth'});

  return json({title});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
];

const SignUpRoute = () => <SignUpPage />;

export default SignUpRoute;
