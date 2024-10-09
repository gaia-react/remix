import {http} from 'msw';
import database from 'test/mocks/database';
import {getLanguage} from 'test/utils';
import {THINGS_URI} from '~/services/api/uris';

const one = http.get(
  `${process.env.API_URL}${THINGS_URI}/:id`,
  ({params, request}) => {
    if (!params.id) {
      return new Response(
        JSON.stringify({
          error: 'Thing ID is required',
        }),
        {status: 400}
      );
    }

    const data = database[getLanguage(request)].things.findFirst({
      where: {
        id: {
          equals: String(params.id),
        },
      },
    });

    if (!data) {
      return new Response(
        JSON.stringify({
          error: `Thing with id "${params.id}" not found`,
        }),
        {status: 404}
      );
    }

    return new Response(JSON.stringify({data}));
  }
);

const all = http.get(
  `${process.env.API_URL}${THINGS_URI}`,
  ({request}) =>
    new Response(
      JSON.stringify({
        data: database[getLanguage(request)].things.getAll(),
      })
    )
);

export default [one, all];
