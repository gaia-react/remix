import {api} from '~/services/api';
import type {User} from './types';
import {LOGIN_URL} from './urls';

export const login = async (data: FormData, request: Request): Promise<User> =>
  api(LOGIN_URL, {
    data,
    method: 'POST',
    request,
  });
