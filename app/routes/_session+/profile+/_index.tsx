import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import i18next from '~/i18next.server';
import ProfilePage from '~/pages/Session/Profile/ProfilePage';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request);
  const title = t('profile.meta.title', {ns: 'pages'});

  return json({title});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
];

const ProfileRoute = () => <ProfilePage />;

export default ProfileRoute;
