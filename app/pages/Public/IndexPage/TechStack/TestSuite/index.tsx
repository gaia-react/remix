import type {FC} from 'react';
import ChromaticLogo from '~/components/Logos/ChromaticLogo';
import MSWLogo from '~/components/Logos/MSWLogo';
import PlaywrightLogo from '~/components/Logos/PlaywrightLogo';
import RTLLogo from '~/components/Logos/RTLLogo';
import StorybookLogo from '~/components/Logos/StorybookLogo';
import VitestLogo from '~/components/Logos/VitestLogo';

const TestSuite: FC = () => (
  <>
    <a
      href="https://storybook.com"
      aria-label="Storybook"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <StorybookLogo height={32} />
    </a>
    <a
      href="https://chromatic.com"
      aria-label="Chromatic"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <ChromaticLogo height={32} />
    </a>
    <a
      href="https://vitest.dev/"
      aria-label="Vitest"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <VitestLogo height={32} />
    </a>
    <a
      href="https://testing-library.com/docs/react-testing-library/intro/"
      aria-label="React Testing Library"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <RTLLogo height={32} />
    </a>
    <a
      href="https://mswjs.io/"
      aria-label="MSW"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <MSWLogo height={32} />
    </a>
    <a
      href="https://playwright.dev/"
      aria-label="Playwright"
      className="plain-link"
      rel="noreferrer"
      target="_blank"
    >
      <PlaywrightLogo height={32} />
    </a>
  </>
);

export default TestSuite;
