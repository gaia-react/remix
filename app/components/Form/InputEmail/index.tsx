import {forwardRef} from 'react';
import {useTranslation} from 'react-i18next';
import InputText from '../InputText';
import type {InputProps} from '../types';

const InputEmail = forwardRef<HTMLInputElement, InputProps>(
  ({autoComplete = 'email', label, placeholder, ...props}, ref) => {
    const {t} = useTranslation('auth');

    return (
      <InputText
        ref={ref}
        autoComplete={autoComplete}
        label={label || t('email')}
        placeholder={placeholder ?? t('emailPlaceholder')}
        {...props}
      />
    );
  }
);

InputEmail.displayName = 'InputEmail';

export default InputEmail;
