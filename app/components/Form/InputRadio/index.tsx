import type {FC, InputHTMLAttributes, ReactNode} from 'react';
import {twJoin, twMerge} from 'tailwind-merge';
import type {RadioOption} from '../types';

export type InputRadioProps<T = HTMLInputElement> = {
  classNameLabel?: string;
  error?: ReactNode;
  isHorizontal?: boolean;
  name: string;
  option: RadioOption;
  type?: never;
} & InputHTMLAttributes<T>;

const InputRadio: FC<InputRadioProps> = ({
  className,
  defaultValue,
  disabled,
  error,
  id,
  name,
  option,
  readOnly,
  required,
  ...props
}) => (
  <label
    key={option.value}
    className={twMerge(
      'flex w-fit select-none gap-2',
      disabled || option.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      className
    )}
    htmlFor={`${id ?? name}-${option.value}`}
  >
    <input
      aria-label={`${id ?? name}-${option.value}`}
      className="mt-0.5"
      defaultChecked={defaultValue === option.value}
      disabled={disabled || option.disabled || readOnly}
      id={`${id ?? name}-${option.value}`}
      name={name}
      readOnly={readOnly}
      required={!!(required && (error || option.error))}
      tabIndex={readOnly ? -1 : undefined}
      type="radio"
      value={option.value}
      {...props}
    />
    <div
      className={twJoin(
        disabled || option.disabled || readOnly ? 'text-disabled' : 'text-body'
      )}
    >
      {option.label}
    </div>
  </label>
);

export default InputRadio;
