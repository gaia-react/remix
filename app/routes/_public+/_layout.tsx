import {Outlet} from '@remix-run/react';
import Layout from '~/components/Layout';

// This is where routes that are publicly available go
const PublicRoute = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default PublicRoute;
