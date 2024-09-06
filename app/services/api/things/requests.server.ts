import {api} from '~/services/api';
import {THINGS_URL} from '../urls';
import {thingSchema} from './parsers';

export const getAllThings = async (request: Request) => {
  const result = await api(THINGS_URL, {request});

  return result.map(thingSchema.parse);
};

export const getThingById = async (id: string, request: Request) => {
  const result = await api(`${THINGS_URL}/${id}`, {request});

  return thingSchema.parse(result);
};

export const createThing = async (data: FormData, request: Request) => {
  const result = api(THINGS_URL, {data, method: 'POST', request});

  return thingSchema.parse(result);
};

export const updateThing = async (data: FormData, request: Request) => {
  const result = api(`${THINGS_URL}/${data.get('id')}`, {
    data,
    method: 'PUT',
    request,
  });

  return thingSchema.parse(result);
};

export const deleteThing = async (
  id: string,
  request: Request
): Promise<null> => api(`${THINGS_URL}/${id}`, {method: 'DELETE', request});
