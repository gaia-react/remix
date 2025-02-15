import type {FC} from 'react';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twMerge} from 'tailwind-merge';

type ErrorStackProps = {
  className?: string;
  stack?: string;
};

const ErrorStack: FC<ErrorStackProps> = ({className, stack}) => {
  if (stack) {
    const handleClick = async () => {
      await navigator.clipboard.writeText(stack);
    };

    return (
      <pre
        className={twMerge(
          'relative whitespace-pre-wrap border-2 border-red-700 bg-grey-900 text-left text-sm text-white',
          className
        )}
      >
        <div className="sticky top-0 flex w-full justify-end">
          <button
            className="flex items-center gap-1 rounded-bl bg-red-700 pb-1 pl-1.5 pr-1 pt-px font-sans text-xs leading-none text-white hover:bg-red-600"
            onClick={handleClick}
            type="button"
          >
            <FontAwesomeIcon icon={faCopy} />
            <span>Copy to clipboard</span>
          </button>
        </div>
        <div className="px-4 pb-4 pt-2">{stack}</div>
      </pre>
    );
  }
};

export default ErrorStack;
