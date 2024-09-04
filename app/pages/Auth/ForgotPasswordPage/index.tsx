import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {twMerge} from 'tailwind-merge';

type ForgotPasswordPageProps = {
  className?: string;
};

const ForgotPasswordPage: FC<ForgotPasswordPageProps> = ({className}) => {
  const {t} = useTranslation('auth');

  return (
    <div className={twMerge(className)}>
      <h1>{t('login.title')}</h1>
    </div>
  );
};

export default ForgotPasswordPage;
