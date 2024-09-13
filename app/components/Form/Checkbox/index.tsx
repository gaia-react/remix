import type {InputHTMLAttributes, ReactNode} from 'react';
import {forwardRef} from 'react';
import {twMerge} from 'tailwind-merge';
import FieldStatus from '../Field/FieldStatus';

export type CheckboxProps<T = HTMLInputElement> = {
  classNameDescription?: string;
  classNameInput?: string;
  classNameLabel?: string;
  description?: ReactNode;
  error?: ReactNode;
  label?: ReactNode;
  name: string;
  type?: never;
} & InputHTMLAttributes<T>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      classNameDescription,
      classNameInput,
      classNameLabel,
      description,
      disabled,
      error,
      id,
      label,
      name,
      readOnly,
      required,
      ...props
    },
    ref
  ) => {
    const checkbox = (
      <input
        ref={ref}
        className={twMerge(label && 'mt-0.5', classNameInput)}
        id={id ?? name}
        name={name}
        required={required && !!error}
        type="checkbox"
        {...props}
        disabled={disabled ?? readOnly}
      />
    );

    const status =
      (description ?? error) ?
        <FieldStatus
          className={twMerge('mt-0', classNameDescription)}
          description={description}
          disabled={disabled}
          error={error}
          id={id}
        />
      : null;

    if (!label) {
      return (
        <>
          {checkbox}
          {status}
        </>
      );
    }

    const field = (
      <label
        className={twMerge(
          'group inline-flex w-fit select-none gap-2',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          classNameLabel
        )}
        htmlFor={id ?? name}
      >
        {checkbox}
        <div className={(disabled ?? readOnly) ? 'text-disabled' : 'text-body'}>
          {label}
        </div>
      </label>
    );

    if (!status) {
      return field;
    }

    return (
      <div className={className}>
        {field}
        {status}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
