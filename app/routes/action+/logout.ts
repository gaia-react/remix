import type {ActionFunction} from 'react-router';
import {redirect} from 'react-router';
import {sessionStorage} from '~/sessions.server/auth';

export const action: ActionFunction = async ({request}) => {
  const session = await sessionStorage.getSession(
    request.headers.get('cookie')
  );

  return redirect('/login', {
    headers: {'Set-Cookie': await sessionStorage.destroySession(session)},
  });
};

export const loader = async () => redirect('/', {status: 404});
