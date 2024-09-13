import {createCookieSessionStorage} from '@remix-run/node';
import {env} from '~/env.server';

export const languageStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    maxAge: 31_536_000,
    name: 'i18next',
    path: '/',
    sameSite: 'lax',
    secrets: [env.SESSION_SECRET],
    // You cannot set true in Safari unless you're in production
    secure: env.NODE_ENV === 'production',
  },
});

export const getLanguageSession = async (request: Request) => {
  const session = await languageStorage.getSession(
    request.headers.get('cookie')
  );

  return {
    commit: () => languageStorage.commitSession(session),
    get: () => session.get('language'),
    set: (value: string) => session.set('language', value),
  };
};
