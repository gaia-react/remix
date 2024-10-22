import type {FC} from 'react';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {toast as notify, ToastContainer} from 'react-toastify';
import {config} from '@fortawesome/fontawesome-svg-core';
import {cssBundleHref} from '@remix-run/css-bundle';
import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import {useChangeLanguage} from 'remix-i18next/react';
import {getToast, setToastCookieOptions} from 'remix-toast';
import {twJoin} from 'tailwind-merge';
import Document from '~/components/Document';
import i18next from '~/i18next.server';
import {setApiLanguage} from '~/services/api';
import {getAuthenticatedUser} from '~/sessions.server/auth';
import {getLanguageSession} from '~/sessions.server/language';
import {getThemeSession} from '~/sessions.server/theme';
import State from '~/state';
import {useTheme} from '~/state/theme';
import tailwind from '~/styles/tailwind.css?url';
import {isProductionHost} from '~/utils/http.server';
import ErrorBoundary from './components/ErrorBoundary';
import {env, envClient} from './env.server';
import 'react-toastify/dist/ReactToastify.min.css';
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

  return json(
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

export const links: LinksFunction = () => [
  {href: tailwind, rel: 'stylesheet'},
  ...(cssBundleHref ? [{href: cssBundleHref, rel: 'stylesheet'}] : []),
];

const App: FC = () => {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  const {i18n} = useTranslation();

  const {ENV, language, noIndex, toast} = data;

  // This hook will change the i18n instance language to the current language
  // detected by the loader, this way, when we do something to change the
  // language, this language will change and i18next will load the correct
  // translation files
  useChangeLanguage(language);

  useEffect(() => {
    if (toast) {
      notify(toast.message, {type: toast.type});
    }
  }, [toast]);

  return (
    <Document
      className={twJoin(theme)}
      dir={i18n.dir()}
      isSsrTheme={!!data.theme}
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
      <ToastContainer position="top-center" theme={theme ?? 'light'} />
    </Document>
  );
};

const AppWithState = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <State theme={data.theme} user={data.user}>
      <App />
    </State>
  );
};

export {ErrorBoundary};

export default AppWithState;
