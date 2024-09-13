import {forwardRef} from 'react';
import {useTranslation} from 'react-i18next';
import InputText from '../InputText';
import type {InputProps} from '../types';

const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({autoComplete = 'password', label, ...props}, ref) => {
    const {t} = useTranslation('auth');

    return (
      <InputText
        ref={ref}
        autoComplete={autoComplete}
        label={label || t('password')}
        {...props}
        placeholder="••••••••"
        type="password"
      />
    );
  }
);

InputPassword.displayName = 'InputPassword';

export default InputPassword;
