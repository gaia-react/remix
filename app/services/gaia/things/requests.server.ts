import {GAIA_ENDPOINTS} from '../endpoints';
import {api} from '../index';
import {thingSchema, thingsSchema} from './parsers';

export const getAllThings = async () => {
  const result = await api(GAIA_ENDPOINTS.things);

  return thingsSchema.parse(result.data);
};

export const getThingById = async (id: string) => {
  const result = await api(GAIA_ENDPOINTS.thingsId, {pathParams: {id}});

  return thingSchema.parse(result.data);
};

export const createThing = async (body: FormData) => {
  const result = await api(GAIA_ENDPOINTS.things, {body, method: 'POST'});

  return thingSchema.parse(result.data);
};

export const updateThing = async (body: FormData) => {
  const result = await api(GAIA_ENDPOINTS.thingsId, {
    body,
    method: 'PUT',
    pathParams: {id: body.get('id')},
  });

  return thingSchema.parse(result.data);
};

export const deleteThing = async (id: string) =>
  api(GAIA_ENDPOINTS.thingsId, {method: 'DELETE', pathParams: {id}});
