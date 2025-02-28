import type {ActionFunction} from 'react-router';
import {data, redirect, replace} from 'react-router';
import {getLanguageSession} from '~/sessions.server/language';

export const action: ActionFunction = async ({request}) => {
  const languageSession = await getLanguageSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const language = form.get('language') as string;
  const redirectUrl = form.get('redirectUrl') as string;

  if (!['en', 'ja'].includes(language) || !redirectUrl) {
    return data(
      {
        message: `language value of ${language} is not a valid language`,
        ok: false,
      },
      {status: 400}
    );
  }

  languageSession.set(language);

  return replace(redirectUrl, {
    headers: {
      'Set-Cookie': await languageSession.commit(),
    },
  });
};

export const loader = async () => redirect('/', {status: 404});
