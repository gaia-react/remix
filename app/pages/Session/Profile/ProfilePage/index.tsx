import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {twMerge} from 'tailwind-merge';
import {useUser} from '~/state/user';

type ProfilePageProps = {
  className?: string;
};

const ProfilePage: FC<ProfilePageProps> = ({className}) => {
  const {t} = useTranslation('pages', {keyPrefix: 'profile'});

  const {familyName, givenName} = useUser();

  return (
    <section className={twMerge('container space-y-8 py-12', className)}>
      <h1 className="text-center text-3xl font-bold">
        {t('fullName', {familyName, givenName})}
      </h1>
    </section>
  );
};

export default ProfilePage;
