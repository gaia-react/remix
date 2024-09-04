import type {FC} from 'react';

type SiteVersionProps = {
  className?: string;
};

const SiteVersion: FC<SiteVersionProps> = ({className}) => (
  <small className={className}>
    {process.env.npm_package_version}
    {process.env.COMMIT_SHA && <>-{process.env.COMMIT_SHA}</>}
  </small>
);

export default SiteVersion;
