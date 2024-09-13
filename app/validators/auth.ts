import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const login = withZod(
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
);
