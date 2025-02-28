import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {data} from 'react-router';
import i18next from '~/i18next.server';
import ProfilePage from '~/pages/Session/Profile/ProfilePage';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request);
  const title = t('profile.meta.title', {ns: 'pages'});

  return data({title});
};

export const meta: MetaFunction<typeof loader> = (loaderData) => [
  {title: loaderData?.data?.title},
];

const ProfileRoute = () => <ProfilePage />;

export default ProfileRoute;
