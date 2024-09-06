import {pick} from 'accept-language-parser';
import {set} from 'date-fns';
import type {Language} from '~/languages';
import {LANGUAGES} from '~/languages';

export const DELAY =
  (
    process.env.NODE_ENV === 'test' ||
    process.env.npm_lifecycle_script === 'playwright'
  ) ?
    0
  : 250;

export const getLanguage = (request: Request) =>
  (pick(LANGUAGES, request.headers.get('Accept-Language') ?? 'en') ??
    'en') as Language;

const base = set(new Date(), {
  date: 1,
  hours: 12,
  milliseconds: 0,
  minutes: 0,
  month: 0,
  seconds: 0,
  year: new Date().getFullYear() + 1,
});

export const date = (values?: Parameters<typeof set>[1]): Date =>
  values ? set(base, values) : base;
