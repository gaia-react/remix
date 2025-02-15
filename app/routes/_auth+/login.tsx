import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from 'react-router';
import {redirect} from 'react-router';
import i18next from '~/i18next.server';
import LoginPage from '~/pages/Auth/LoginPage';
import {
  authenticator,
  requireNotAuthenticated,
  sessionStorage,
} from '~/sessions.server/auth';

export const action: ActionFunction = async ({request}) => {
  const user = await authenticator.authenticate('form', request);

  if (!user) {
    const t = await i18next.getFixedT(request, 'errors');

    return {error: t('invalidCredentials')};
  }

  const session = await sessionStorage.getSession(
    request.headers.get('cookie')
  );

  session.set('user', user);

  throw redirect('/profile', {
    headers: {'Set-Cookie': await sessionStorage.commitSession(session)},
  });
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  await requireNotAuthenticated(request);

  const t = await i18next.getFixedT(request, 'auth');
  const title = t('login');

  return {title};
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
];

const LoginRoute = () => <LoginPage />;

export default LoginRoute;
