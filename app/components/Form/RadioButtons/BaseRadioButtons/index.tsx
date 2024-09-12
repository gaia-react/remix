import type {FC, InputHTMLAttributes, ReactNode} from 'react';
import CheckboxRadioGroup from '~/components/Form/CheckboxRadioGroup';
import InputRadio from '~/components/Form/InputRadio';
import type {RadioOption} from '~/components/Form/types';

export type BaseRadioButtonsProps<T = HTMLInputElement> = {
  classNameLabel?: string;
  error?: ReactNode;
  isHorizontal?: boolean;
  name: string;
  options: RadioOption[];
  type?: never;
} & InputHTMLAttributes<T>;

const BaseRadioButtons: FC<BaseRadioButtonsProps> = ({
  children,
  className,
  classNameLabel,
  isHorizontal,
  options,
  ...props
}) => (
  <CheckboxRadioGroup className={className} isHorizontal={isHorizontal}>
    {options.map((option) => (
      <InputRadio
        key={`${option.label}-${option.value}`}
        className={classNameLabel}
        option={option}
        {...props}
      />
    ))}
    {children}
  </CheckboxRadioGroup>
);

export default BaseRadioButtons;
