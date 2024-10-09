import {api} from '~/services/api';
import {userSchema} from '~/services/api/auth/parsers';
import {LOGIN_URI} from '../uris';

export const login = async (request: Request, data: FormData) => {
  const result = await api(LOGIN_URI, {
    data,
    method: 'POST',
    request,
  });

  return userSchema.parse(result);
};
