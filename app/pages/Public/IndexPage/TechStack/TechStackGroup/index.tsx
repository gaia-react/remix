import type {FC, ReactNode} from 'react';

type TechStackGroupProps = {
  children: ReactNode;
  name?: string;
};

const TechStackGroup: FC<TechStackGroupProps> = ({children, name}) => (
  <div className="relative flex items-center gap-4 overflow-hidden rounded-md border border-grey-600/40 bg-grey-900/30 px-3 pb-2.5 pt-7">
    <div className="absolute left-0 top-0 w-full bg-grey-600/40 py-0.5 text-center text-xs text-grey-100/90">
      {name}
    </div>
    {children}
  </div>
);

export default TechStackGroup;
