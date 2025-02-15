import type {FC} from 'react';
import {useEffect} from 'react';
import type {LinksFunction, LoaderFunctionArgs} from 'react-router';
import {useTranslation} from 'react-i18next';
import {data, Outlet, useLoaderData} from 'react-router';
import {config} from '@fortawesome/fontawesome-svg-core';
import {useChangeLanguage} from 'remix-i18next/react';
import {getToast, setToastCookieOptions} from 'remix-toast';
import {twJoin} from 'tailwind-merge';
import Document from '~/components/Document';
import RootErrorBoundary from '~/components/RootErrorBoundary';
import Toast, {toast as notify} from '~/components/Toast';
import i18next from '~/i18next.server';
import {setApiLanguage} from '~/services/api';
import {getAuthenticatedUser} from '~/sessions.server/auth';
import {getLanguageSession} from '~/sessions.server/language';
import {getThemeSession} from '~/sessions.server/theme';
import State from '~/state';
import {useTheme} from '~/state/theme';
import {isProductionHost} from '~/utils/http.server';
import {env, envClient} from './env.server';
import tailwind from '~/styles/tailwind.css?url';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const loader = async ({request}: LoaderFunctionArgs) => {
  const isProduction = isProductionHost(request);

  const user = await getAuthenticatedUser(request);

  const languageSession = await getLanguageSession(request);

  const language = languageSession.get() || (await i18next.getLocale(request));

  setApiLanguage(language);

  const themeSession = await getThemeSession(request);

  setToastCookieOptions({secrets: [env.SESSION_SECRET]});

  const {headers, toast} = await getToast(request);

  headers.set('Vary', 'Cookie');

  return data(
    {
      ENV: envClient,
      language,
      noIndex: !isProduction,
      theme: themeSession.getTheme(),
      toast,
      user,
    },
    {headers}
  );
};

export const links: LinksFunction = () => [{href: tailwind, rel: 'stylesheet'}];

const App: FC = () => {
  const loaderData = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  const {i18n} = useTranslation();

  const {ENV, language, noIndex, toast} = loaderData;

  // This hook will change the i18n instance language to the current language
  // detected by the loader, this way, when we do something to change the
  // language, this language will change and i18next will load the correct
  // translation files
  useChangeLanguage(language);

  useEffect(() => {
    if (toast) {
      if (notify[toast.type]) {
        notify[toast.type](toast);
      } else {
        notify.error({
          message: `Unknown toast type ${toast.type}`,
          type: 'error',
        });
      }
    }
  }, [toast]);

  return (
    <Document
      className={twJoin(theme)}
      dir={i18n.dir()}
      isSsrTheme={!!loaderData.theme}
      lang={language}
      noIndex={noIndex}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `window.process = ${JSON.stringify({
            env: ENV,
          })}`,
        }}
      />
      <Outlet />
      <Toast />
    </Document>
  );
};

const AppWithState = () => {
  const {theme, user} = useLoaderData<typeof loader>();

  return (
    <State theme={theme} user={user}>
      <App />
    </State>
  );
};

export default AppWithState;

export const ErrorBoundary = RootErrorBoundary;
