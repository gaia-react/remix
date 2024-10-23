import {api} from '../api';
import {GAIA_URLS} from '../urls';
import {thingSchema, thingsSchema} from './parsers';

export const getAllThings = async () => {
  const result = await api(GAIA_URLS.things);

  return thingsSchema.parse(result.data);
};

export const getThingById = async (id: string) => {
  const result = await api(GAIA_URLS.thingsId, {pathParams: {id}});

  return thingSchema.parse(result.data);
};

export const createThing = async (body: FormData) => {
  const result = await api(GAIA_URLS.things, {body, method: 'POST'});

  return thingSchema.parse(result.data);
};

export const updateThing = async (body: FormData) => {
  const result = await api(GAIA_URLS.thingsId, {
    body,
    method: 'PUT',
    pathParams: {id: body.get('id')},
  });

  return thingSchema.parse(result.data);
};

export const deleteThing = async (id: string) =>
  api(GAIA_URLS.thingsId, {method: 'DELETE', pathParams: {id}});
