import type {LoaderFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Outlet} from '@remix-run/react';
import Layout from '~/components/Layout';
import {requireSession} from '~/sessions.server/auth';

// routes inside _session+ require a session

export const loader = async ({request}: LoaderFunctionArgs) => {
  await requireSession(request);

  return json(null);
};

const SessionRoute = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default SessionRoute;
