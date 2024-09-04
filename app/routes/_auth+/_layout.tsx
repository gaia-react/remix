import {Outlet} from '@remix-run/react';
import Layout from '~/components/Layout';

const AuthRoute = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default AuthRoute;
