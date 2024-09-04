import {nullable, primaryKey} from '@mswjs/data';
import date from 'test/utils';
import {z} from 'zod';

export const serverThingSchema = z.object({
  created_at: z.string().datetime(),
  description: z.string(),
  id: z.string(),
  name: z.string(),
  updated_at: z.string().datetime().nullable(),
});

export type ServerThing = z.infer<typeof serverThingSchema>;

const schema = {
  created_at: String,
  description: String,
  id: primaryKey(String),
  name: String,
  updated_at: nullable(String),
};

const en: ServerThing[] = [
  {
    created_at: date().toISOString(),
    description: 'This is the first thing',
    id: '1',
    name: 'Thing A',
    updated_at: null,
  },
  {
    created_at: date({seconds: 1}).toISOString(),
    description: 'This is the second thing',
    id: '2',
    name: 'Thing B',
    updated_at: null,
  },
];

const ja: ServerThing[] = [
  {
    created_at: date().toISOString(),
    description: 'これは1番',
    id: '1',
    name: '物A',
    updated_at: null,
  },
  {
    created_at: date({seconds: 1}).toISOString(),
    description: 'これは2番',
    id: '2',
    name: '物B',
    updated_at: null,
  },
];

export default {en, ja, schema};
