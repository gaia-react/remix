import {createCookieSessionStorage, redirect} from '@remix-run/node';
import {env} from '~/env.server';

// Based on SergioDXA's remix-auth
// https://remix.run/resources/remix-auth

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true, // for security reasons, make this cookie http only
    name: '__session', // use any name you want here
    path: '/', // remember to add this so the cookie will work in all routes
    sameSite: 'lax', // this helps with CSRF
    secrets: [env.SESSION_SECRET],
    // You cannot set true in Safari unless you're in production
    secure: env.NODE_ENV === 'production',
  },
});

// you can also export the methods individually for your own usage
export const {commitSession, destroySession, getSession} = sessionStorage;

/**
 * utility for routes which require a session
 */
export const requireSession = async (request: Request) => {
  const session = await getSession(request.headers.get('cookie'));

  if (!session.get('token')) {
    throw redirect('/login', {
      statusText: 'Unauthorized',
    });
  }

  return {session};
};

/**
 * utility for routes which require no session (login, signup, forgot password)
 */
export const requireNoSession = async (request: Request) => {
  const session = await getSession(request.headers.get('cookie'));

  if (!session.get('token')) {
    throw redirect('/');
  }

  return {ok: true};
};
