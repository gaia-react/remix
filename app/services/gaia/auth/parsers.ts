import {z} from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  familyName: z.string(),
  givenName: z.string(),
  id: z.string(),
  token: z.string(),
});
