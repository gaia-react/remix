import type {ReactNode} from 'react';

export type Maybe<T> = null | T | undefined;

export type Size = 'base' | 'lg' | 'sm' | 'xl' | 'xs';

export type Option = {
  disabled?: boolean;
  label: ReactNode;
  value: string;
};
