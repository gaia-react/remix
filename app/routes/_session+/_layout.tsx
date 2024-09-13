import type {LoaderFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Outlet} from '@remix-run/react';
import Layout from '~/components/Layout';
import {requireAuthenticatedUser} from '~/sessions.server/auth';

// routes inside _session+ require a session

export const loader = async ({request}: LoaderFunctionArgs) => {
  await requireAuthenticatedUser(request);

  return json(null);
};

const SessionRoute = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default SessionRoute;
