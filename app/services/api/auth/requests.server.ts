import {api} from '~/services/api';
import {userSchema} from '~/services/api/auth/parsers';
import {LOGIN_URL} from '../urls';

export const login = async (data: FormData, request: Request) => {
  const result = await api(LOGIN_URL, {
    data,
    method: 'POST',
    request,
  });

  return userSchema.parse(result);
};
