import type {FC} from 'react';
import {isRouteErrorResponse, useRouteError} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import Document from '~/components/Document';
import {getPreferredTheme} from '~/state/theme';
import {canUseDOM} from '~/utils/dom';

const ErrorBoundary: FC = () => {
  const error = useRouteError();
  const theme = getPreferredTheme();

  if (!canUseDOM) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  if (isRouteErrorResponse(error)) {
    return (
      <Document
        className={twJoin(theme)}
        lang="en"
        noIndex={true}
        title={error.statusText}
      >
        <main className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="flex gap-2 text-2xl leading-10 tracking-wide">
              {error.status}
              {error.statusText ? ` | ${error.statusText}` : ''}
            </h1>
            {process.env.NODE_ENV !== 'production' && error.data && (
              <p className="text-red-500">{error.data}</p>
            )}
          </div>
        </main>
      </Document>
    );
  }

  if (error instanceof Error) {
    return (
      <Document
        className={twJoin(theme)}
        lang="en"
        noIndex={true}
        title="Error"
      >
        <main className="space-y-4 p-8">
          <h1 className="text-4xl">Error</h1>
          <p>{error.message}</p>
          <pre className="whitespace-pre-wrap border border-red-700 p-4 text-sm">
            {error.stack}
          </pre>
        </main>
      </Document>
    );
  }

  return (
    <Document
      className={twJoin(theme)}
      lang="en"
      noIndex={true}
      title="Unexpected error"
    >
      <main className="p-8">
        <h1 className="text-2xl">An unexpected error occurred</h1>
      </main>
    </Document>
  );
};

export default ErrorBoundary;
