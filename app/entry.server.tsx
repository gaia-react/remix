/* eslint-disable prefer-arrow/prefer-arrow-functions,no-console */
/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import {I18nextProvider, initReactI18next} from 'react-i18next';
import type {EntryContext} from '@remix-run/node';
import {createReadableStreamFromReadable} from '@remix-run/node';
import {RemixServer} from '@remix-run/react';
import {createInstance} from 'i18next';
import {isbot} from 'isbot';
import {renderToPipeableStream} from 'react-dom/server';
import {PassThrough} from 'node:stream';
import {getLanguageSession} from '~/sessions.server/language';
import {startApiMocks} from '../test/msw.server';
import {env} from './env.server';
import i18n from './i18n';
import i18next from './i18next.server';
import 'dotenv/config';

if (env.NODE_ENV !== 'production' && env.MSW_ENABLED) {
  startApiMocks();
}

const ABORT_DELAY = 5000;

// eslint-disable-next-line max-params
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const url = new URL(request.url);

  // disallow www subdomain
  if (url.host.includes('www.')) {
    url.host = url.host.replace('www.', '');

    return Response.redirect(url.toString(), 301);
  }

  // remove trailing slash on all routes
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);

    return Response.redirect(url.toString(), 301);
  }

  /* Optionally force lowercase URLs to prevent duplicate content for SEO
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();

    return Response.redirect(url.toString(), 301);
  }
  */

  const userAgent = request.headers.get('user-agent') ?? '';

  const callbackName = isbot(userAgent) ? 'onAllReady' : 'onShellReady';

  const instance = createInstance({detection: {}});
  const languageCookie = await getLanguageSession(request);
  const detectedLanguage = await i18next.getLocale(request);
  const lng = languageCookie.get() || detectedLanguage;
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance.use(initReactI18next).init({
    ...i18n,
    lng,
    ns,
  });

  return new Promise((resolve, reject) => {
    let didError = false;

    const {abort, pipe} = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough();

          responseHeaders.set('Content-Type', 'text/html');

          /* Optional response headers for SEO
          responseHeaders.set(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains'
          );
          responseHeaders.set('X-Content-Type-Options', 'nosniff');
          responseHeaders.set('X-Frame-Options', 'DENY');
          */

          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
        onShellError(error: unknown) {
          reject(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
