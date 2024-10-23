import {api} from '../api';
import {GAIA_URLS} from '../urls';
import {userSchema} from './parsers';

export const login = async (body: FormData) => {
  const result = await api(GAIA_URLS.login, {
    body,
    method: 'POST',
  });

  return userSchema.parse(result.data);
};
