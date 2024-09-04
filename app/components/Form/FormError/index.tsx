import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useActionData} from '@remix-run/react';
import {twMerge} from 'tailwind-merge';

type FormResultProps = {
  className?: string;
  hide?: boolean;
};

type FormActionData = {
  error?: string;
};

const FormError: FC<FormResultProps> = ({className, hide}) => {
  const {t} = useTranslation('errors');
  const {error} = useActionData<FormActionData>() ?? {};

  const [result, setResult] = useState<string>('');

  useEffect(() => {
    setResult(
      hide ? ''
        // @ts-ignore
      : error ? t(error)
      : ''
    );
  }, [error, hide, t]);

  if (!result) {
    return null;
  }

  const onClick = () => setResult('');

  return (
    <button
      className={twMerge(
        'flex w-full items-center justify-between rounded-md border-red-600 bg-red-500 px-4 py-2 text-white dark:border-red-400',
        className
      )}
      onClick={onClick}
      type="button"
    >
      <span>{result}</span>
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
};

export default FormError;
