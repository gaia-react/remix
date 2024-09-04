import type {FC, ReactNode} from 'react';
import {createContext, useContext} from 'react';
import type {Thing} from '~/services/api/things/types';
import type {Maybe} from '~/types';

// Based on Kent C Dodds' blog post:
// https://kentcdodds.com/blog/how-to-use-react-context-effectively'

// This is a read-only provider. See the GAIA docs for more info.

type ThingsContextValue = Maybe<Thing[]>;

const ThingsContext = createContext<ThingsContextValue>(undefined);

export const useThings = () => {
  const context = useContext(ThingsContext) as Maybe<ThingsContextValue>;

  if (!context) {
    throw new Error('useThing must be used within a ThingsProvider');
  }

  return context;
};

type ThingsProviderProps = {
  children: ReactNode;
  things?: Maybe<Thing[]>;
};

export const ThingsProvider: FC<ThingsProviderProps> = ({children, things}) => (
  <ThingsContext.Provider value={things}>{children}</ThingsContext.Provider>
);

ThingsProvider.displayName = 'ThingsProvider';
