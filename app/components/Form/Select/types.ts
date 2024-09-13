import type {Option} from '../types';

type SelectOptionWithValue = {
  options?: never;
  value: string;
};

type SelectOptionWithOptions = {
  options: Option[];
  value?: never;
};

export type SelectOption = {
  disabled?: boolean;
  label: string;
} & (SelectOptionWithOptions | SelectOptionWithValue);
