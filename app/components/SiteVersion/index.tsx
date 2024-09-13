import type {FC} from 'react';

type SiteVersionProps = {
  className?: string;
};

const SiteVersion: FC<SiteVersionProps> = ({className}) => (
  <small className={className}>
    {process.env.npm_package_version}
    {process.env.NODE_ENV !== 'production' && process.env.COMMIT_SHA && (
      <>-{process.env.COMMIT_SHA.slice(0, 6)}</>
    )}
  </small>
);

export default SiteVersion;
