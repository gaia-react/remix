import {primaryKey} from '@mswjs/data';
import {z} from 'zod';

export const serverUserSchema = z.object({
  family_name: z.string(),
  given_name: z.string(),
  id: z.string(),
});

export type ServerUser = z.infer<typeof serverUserSchema>;

const schema = {
  family_name: String,
  given_name: String,
  id: primaryKey(String),
};

const en: ServerUser = {
  family_name: 'Smith',
  given_name: 'John',
  id: '1',
};

const ja: ServerUser = {
  family_name: '山田',
  given_name: '太郎',
  id: '2',
};

export default {en, ja, schema};
