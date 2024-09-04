import {z} from 'zod';

export const userSchema = z.object({
  familyName: z.string(),
  givenName: z.string(),
  id: z.string(),
});

export type User = z.infer<typeof userSchema>;
