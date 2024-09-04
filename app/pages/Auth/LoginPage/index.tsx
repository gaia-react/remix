import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {twMerge} from 'tailwind-merge';

type LoginPageProps = {
  className?: string;
};

const LoginPage: FC<LoginPageProps> = ({className}) => {
  const {t} = useTranslation('auth');

  return (
    <div className={twMerge(className)}>
      <h1>{t('login.title')}</h1>
    </div>
  );
};

export default LoginPage;
