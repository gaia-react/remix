import type {z} from 'zod';
import type {thingSchema} from '~/services/api/things/parsers';

export type Thing = z.infer<typeof thingSchema>;
