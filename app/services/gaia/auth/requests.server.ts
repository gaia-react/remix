import {GAIA_ENDPOINTS} from '../endpoints';
import {api} from '../index';
import {userSchema} from './parsers';

export const login = async (body: FormData) => {
  const result = await api(GAIA_ENDPOINTS.login, {
    body,
    method: 'POST',
  });

  return userSchema.parse(result.data);
};
