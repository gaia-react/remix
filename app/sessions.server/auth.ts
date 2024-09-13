import {createCookieSessionStorage} from '@remix-run/node';
import {Authenticator} from 'remix-auth';
import {FormStrategy} from 'remix-auth-form';
import SparkMD5 from 'spark-md5';
import {env} from '~/env.server';
import {login} from '~/services/api/auth/requests.server';
import type {User} from '~/services/api/auth/types';

// Based on SergioDXA's remix-auth
// https://remix.run/resources/remix-auth

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true, // for security reasons, make this cookie http only
    maxAge: 60 * 60, // 1 hour
    name: '__session', // use any name you want here
    path: '/', // remember to add this so the cookie will work in all routes
    sameSite: 'lax', // this helps with CSRF
    secrets: [env.SESSION_SECRET],
    // You cannot set true in Safari unless you're in production
    secure: env.NODE_ENV === 'production',
  },
});

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage, {
  throwOnError: true,
});

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({form, request}) => {
    const password = form.get('password');
    const hashedPassword = SparkMD5.hash(password as string);

    const formData = new FormData();
    formData.set('email', form.get('email') as string);
    formData.set('password', hashedPassword);

    return login(formData, request);
  }),
  'email-password'
);

export const getAuthenticatedUser = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  return session.get('user');
};

// utility for routes which require a session
export const requireAuthenticatedUser = async (request: Request) =>
  authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

//utility for routes which require no session (login, signup, forgot password)
export const requireNotAuthenticated = async (request: Request) =>
  authenticator.isAuthenticated(request, {
    successRedirect: '/profile',
  });
