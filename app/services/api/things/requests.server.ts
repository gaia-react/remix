import {api} from '~/services/api';
import {THINGS_URI} from '../uris';
import {thingSchema} from './parsers';

export const getAllThings = async (request: Request) => {
  const result = await api(THINGS_URI, {request});

  return result.map(thingSchema.parse);
};

export const getThingById = async (request: Request, id: string) => {
  const result = await api(`${THINGS_URI}/${id}`, {request});

  return thingSchema.parse(result);
};

export const createThing = async (request: Request, data: FormData) => {
  const result = await api(THINGS_URI, {data, method: 'POST', request});

  return thingSchema.parse(result);
};

export const updateThing = async (request: Request, data: FormData) => {
  const result = await api(`${THINGS_URI}/${data.get('id')}`, {
    data,
    method: 'PUT',
    request,
  });

  return thingSchema.parse(result);
};

export const deleteThing = async (
  request: Request,
  id: string
): Promise<null> => api(`${THINGS_URI}/${id}`, {method: 'DELETE', request});
