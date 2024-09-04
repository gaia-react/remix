import type {ActionFunction} from '@remix-run/node';
import {json, redirect} from '@remix-run/node';
import {getLanguageSession} from '~/sessions.server/language';

export const action: ActionFunction = async ({request}) => {
  const languageSession = await getLanguageSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const language = form.get('language') as string;

  if (!['en', 'ja'].includes(language)) {
    return json(
      {
        message: `language value of ${language} is not a valid language`,
        ok: false,
      },
      {status: 400}
    );
  }

  languageSession.set(language);

  return json(
    {ok: true},
    {
      headers: {
        'Set-Cookie': await languageSession.commit(),
      },
    }
  );
};

export const loader = async () => redirect('/', {status: 404});
