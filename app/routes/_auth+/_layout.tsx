import {Outlet} from 'react-router';
import Layout from '~/components/Layout';

const AuthRoute = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default AuthRoute;
