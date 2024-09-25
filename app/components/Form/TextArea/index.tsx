import type {ChangeEvent, RefObject, TextareaHTMLAttributes} from 'react';
import {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import autosize from 'autosize';
import {twMerge} from 'tailwind-merge';
import Field from '~/components/Form/Field';
import type {SharedInputProps} from '~/components/Form/types';

const RESIZE = {
  auto: 'resize-none',
  y: 'resize-y',
};

type TextAreaProps<T = HTMLTextAreaElement> = {
  classNameTextArea?: string;
  name: string;
  onAutoSize?: () => void;
  resize?: 'auto' | 'y';
} & SharedInputProps &
  TextareaHTMLAttributes<T>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      classNameDescription,
      classNameLabel,
      classNameTextArea,
      description,
      disabled,
      error,
      extra,
      hideMaxLength,
      id,
      label,
      maxLength,
      name,
      onAutoSize,
      onChange,
      readOnly,
      required,
      resize = 'auto',
      rows = 1,
      value,
      ...props
    },
    externalRef
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const ref = (externalRef || internalRef) as RefObject<HTMLTextAreaElement>;

    const [length, setLength] = useState(0);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (maxLength) {
          setLength(event.currentTarget.value.length);
        }
        onChange?.(event);
      },
      [maxLength, onChange]
    );

    useEffect(() => {
      if (resize === 'auto' && ref.current) {
        const textArea = ref.current;

        autosize(textArea);

        if (onAutoSize) {
          textArea.addEventListener('autosize:resized', onAutoSize);
        }

        return () => {
          if (onAutoSize) {
            textArea.removeEventListener('autosize:resized', onAutoSize);
          }
        };
      }
    }, [onAutoSize, ref, resize]);

    return (
      <Field
        aria-label={props['aria-label'] ?? name}
        className={className}
        classNameDescription={classNameDescription}
        classNameLabel={classNameLabel}
        description={description}
        disabled={disabled || readOnly}
        error={error}
        extra={extra}
        hideMaxLength={hideMaxLength}
        id={id ?? name}
        label={label}
        length={length}
        maxLength={maxLength}
        name={name}
        required={required}
        type="textarea"
      >
        <textarea
          ref={ref}
          aria-label={
            (props['aria-label'] ?? label === null) ? undefined
            : typeof label === 'string' ?
              label
            : name
          }
          className={twMerge(
            'w-full',
            RESIZE[resize],
            error && 'input-invalid',
            classNameTextArea
          )}
          disabled={disabled}
          id={id ?? name}
          maxLength={maxLength}
          name={name}
          onChange={handleChange}
          readOnly={readOnly}
          rows={rows}
          tabIndex={readOnly ? -1 : undefined}
          {...props}
        />
      </Field>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
