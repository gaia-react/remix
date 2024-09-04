import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {twJoin} from 'tailwind-merge';

type VerifyEmailPageProps = {
  className?: string;
};

const VerifyEmailPage: FC<VerifyEmailPageProps> = ({className}) => {
  const {t} = useTranslation('pages');

  return (
    <section className={twJoin('container space-y-8 py-12', className)}>
      <h1 className="text-center text-3xl font-bold">
        {t('profile.verifyEmail.meta.title')}
      </h1>
    </section>
  );
};

export default VerifyEmailPage;
