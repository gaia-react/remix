import {api} from '~/services/api';
import type {Thing} from './types';
import {thingSchema} from './types';
import {THINGS_URL} from './urls';

export const getThings = async (request: Request): Promise<Thing[]> => {
  const data = await api(THINGS_URL, {request});

  return data.map(thingSchema.parse);
};

export const getThingById = async (
  id: string,
  request: Request
): Promise<Thing> => {
  const data = await api(`${THINGS_URL}/${id}`, {request});

  return thingSchema.parse(data);
};

export const createThing = async (
  data: FormData,
  request: Request
): Promise<Thing> => api(THINGS_URL, {data, method: 'POST', request});

export const updateThing = async (
  data: FormData,
  request: Request
): Promise<Thing> =>
  api(`${THINGS_URL}/${data.get('id')}`, {
    data,
    method: 'PUT',
    request,
  });

export const deleteThing = async (
  id: string,
  request: Request
): Promise<null> => api(`${THINGS_URL}/${id}`, {method: 'DELETE', request});
