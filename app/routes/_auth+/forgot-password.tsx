import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {json} from '@remix-run/node';
import i18next from '~/i18next.server';
import ForgotPasswordPage from '~/pages/Auth/ForgotPasswordPage';
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
  const title = t('forgotPassword.title', {ns: 'auth'});

  return json({title}, {headers: request.headers});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
];

const ForgotPasswordRoute = () => <ForgotPasswordPage />;

export default ForgotPasswordRoute;
