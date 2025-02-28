import type {FC} from 'react';
import ESLintLogo from '~/components/Logos/ESLintLogo';
import PrettierLogo from '~/components/Logos/PrettierLogo';
import StylelintLogo from '~/components/Logos/StylelintLogo';
import TSLogo from '~/components/Logos/TSLogo';

const CodeQuality: FC = () => (
  <>
    <a
      href="https://www.typescriptlang.org/"
      aria-label="TypeScript"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <TSLogo height={26} />
    </a>
    <a
      href="https://prettier.io/"
      aria-label="Prettier"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <PrettierLogo height={26} />
    </a>
    <a
      href="https://eslint.org/"
      aria-label="ESLint"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <ESLintLogo height={26} />
    </a>
    <a
      href="https://stylelint.io/"
      aria-label="Stylelint"
      className="plain-link text-white"
      rel="noreferrer"
      target="_blank"
    >
      <StylelintLogo height={26} />
    </a>
  </>
);

export default CodeQuality;
