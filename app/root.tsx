import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {config} from '@fortawesome/fontawesome-svg-core';
import {cssBundleHref} from '@remix-run/css-bundle';
import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import {useChangeLanguage} from 'remix-i18next/react';
import {twJoin} from 'tailwind-merge';
import Document from '~/components/Document';
import i18next from '~/i18next.server';
import {getLanguageSession} from '~/sessions.server/language';
import {getThemeSession} from '~/sessions.server/theme';
import State from '~/state';
import {useTheme} from '~/state/theme';
import tailwind from '~/styles/tailwind.css?url';
import {isProductionHost} from '~/utils/http.server';
import ErrorBoundary from './components/ErrorBoundary';
import {envClient} from './env.server';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const loader = async ({request}: LoaderFunctionArgs) => {
  const isProduction = isProductionHost(request);

  const languageSession = await getLanguageSession(request);

  const language = languageSession.get() || (await i18next.getLocale(request));

  const themeSession = await getThemeSession(request);

  const headers = new Headers();
  headers.set('Vary', 'Cookie');

  return json(
    {
      ENV: envClient,
      language,
      noIndex: !isProduction,
      theme: themeSession.getTheme(),
    },
    {headers}
  );
};

export const links: LinksFunction = () => [
  {href: tailwind, rel: 'stylesheet'},
  ...(cssBundleHref ? [{href: cssBundleHref, rel: 'stylesheet'}] : []),
];

const App: FC = () => {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  const {i18n} = useTranslation();

  const {ENV, language, noIndex} = data;

  // This hook will change the i18n instance language to the current language
  // detected by the loader, this way, when we do something to change the
  // language, this language will change and i18next will load the correct
  // translation files
  useChangeLanguage(language);

  return (
    <Document
      className={twJoin(theme)}
      dir={i18n.dir()}
      isSsrTheme={Boolean(data.theme)}
      lang={language}
      noIndex={noIndex}
    >
      <Outlet />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.process = ${JSON.stringify({
            env: ENV,
          })}`,
        }}
      />
    </Document>
  );
};

const AppWithState = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <State theme={data.theme}>
      <App />
    </State>
  );
};

export {ErrorBoundary};

export default AppWithState;
