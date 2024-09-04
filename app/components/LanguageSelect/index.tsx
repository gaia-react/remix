import type {FC, FormEvent} from 'react';
import {useTranslation} from 'react-i18next';
import {useFetcher, useLocation, useNavigate} from '@remix-run/react';
import {twMerge} from 'tailwind-merge';

const OPTIONS = [
  {label: 'English', value: 'en'},
  {label: '日本語', value: 'ja'},
];

type LanguageSelectProps = {
  className?: string;
  onChange?: () => void;
};

const LanguageSelect: FC<LanguageSelectProps> = ({className, onChange}) => {
  const {
    i18n: {language},
  } = useTranslation();

  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    fetcher.submit(
      {language: event.currentTarget.value},
      {action: '/action/set-language', method: 'POST'}
    );

    const search = new URLSearchParams(location.search);

    let redirectUrl = `${location.pathname}${location.search}${location.hash}`;

    if (search.get('lang')) {
      // remove forced language from the URL if present
      search.delete('lang');

      if (search.size === 0) {
        redirectUrl = `${location.pathname}${location.hash}`;
      } else {
        redirectUrl = `${location.pathname}?${search.toString()}${
          location.hash
        }`;
      }
    }

    navigate(redirectUrl, {replace: true});

    onChange?.();
  };

  return (
    <fetcher.Form
      action="/action/set-language"
      className={twMerge('relative flex-none text-sm', className)}
      method="POST"
    >
      <select
        className="cursor-pointer border-none !bg-transparent bg-none p-0 text-sm !ring-0"
        defaultValue={language}
        name="language"
        onChange={handleChange}
      >
        {OPTIONS.map(({label, value}) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </fetcher.Form>
  );
};

export default LanguageSelect;
