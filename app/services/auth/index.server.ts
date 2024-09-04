import {Authenticator} from 'remix-auth';
import type {User} from '~/services/auth/types';
import {sessionStorage} from '~/sessions.server/auth';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);
