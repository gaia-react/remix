import type {FC} from 'react';
import {useEffect, useState} from 'react';
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
  const {error} = useActionData<FormActionData>() ?? {};

  const [result, setResult] = useState<string>('');

  useEffect(() => {
    setResult(hide ? '' : (error ?? ''));
  }, [error, hide]);

  if (!result) {
    return null;
  }

  const handleClick = () => setResult('');

  return (
    <button
      className={twMerge(
        'flex w-full items-center justify-between rounded-md border-red-600 bg-red-500 px-4 py-2 text-white dark:border-red-400',
        className
      )}
      onClick={handleClick}
      type="button"
    >
      <span role="alert">{result}</span>
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
};

export default FormError;
