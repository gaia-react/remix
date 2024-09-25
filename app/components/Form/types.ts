import type {InputHTMLAttributes, ReactNode} from 'react';
import type {IconProp} from '@fortawesome/fontawesome-svg-core';

export type SharedInputProps = {
  classNameDescription?: string;
  classNameLabel?: string;
  description?: ReactNode;
  error?: ReactNode;
  extra?: ReactNode;
  hideMaxLength?: boolean;
  label?: ReactNode;
  name: string;
};

export type InputProps = {
  classNameIcon?: string;
  classNameInput?: string;
  icon?: IconProp;
  iconPosition?: 'left' | 'right';
} & InputHTMLAttributes<HTMLInputElement> &
  SharedInputProps;

export type Option = {
  disabled?: boolean;
  label: ReactNode;
  value: string;
};

export type RadioOption = {error?: boolean} & Option;
