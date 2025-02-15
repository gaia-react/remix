import type {LoaderFunctionArgs} from 'react-router';
import {Outlet} from 'react-router';
import Layout from '~/components/Layout';
import {requireAuthenticatedUser} from '~/sessions.server/auth';

// routes inside _session+ require a session

export const loader = async ({request}: LoaderFunctionArgs) => {
  await requireAuthenticatedUser(request);

  return null;
};

const SessionRoute = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default SessionRoute;
