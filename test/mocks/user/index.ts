import {primaryKey} from '@mswjs/data';
import {z} from 'zod';

export const serverUserSchema = z.object({
  email: z.string().email(),
  family_name: z.string(),
  given_name: z.string(),
  id: z.string(),
});

export type ServerUser = z.infer<typeof serverUserSchema>;

const schema = {
  email: String,
  family_name: String,
  given_name: String,
  id: primaryKey(String),
};

const en: ServerUser = {
  email: 'user@domain.com',
  family_name: 'Smith',
  given_name: 'John',
  id: '1',
};

const ja: ServerUser = {
  email: 'user@domain.jp',
  family_name: '山田',
  given_name: '太郎',
  id: '1',
};

export default {en, ja, schema};
