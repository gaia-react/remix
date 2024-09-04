import type {InputHTMLAttributes, ReactNode} from 'react';
import type {IconProp} from '@fortawesome/fontawesome-svg-core';

export type InputProps<T = HTMLInputElement> = {
  classNameDescription?: string;
  classNameIcon?: string;
  classNameInput?: string;
  classNameLabel?: string;
  description?: ReactNode;
  error?: ReactNode;
  extra?: ReactNode;
  hideMaxLength?: boolean;
  icon?: IconProp;
  iconPosition?: 'left' | 'right';
  label?: ReactNode;
  name: string;
} & InputHTMLAttributes<T>;
