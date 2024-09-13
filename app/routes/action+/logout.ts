import type {ActionFunction} from '@remix-run/node';
import {redirect} from '@remix-run/node';
import {authenticator} from '~/sessions.server/auth';

export const action: ActionFunction = async ({request}) =>
  authenticator.logout(request, {redirectTo: '/'});

export const loader = async () => redirect('/', {status: 404});
