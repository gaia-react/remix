import {delay, http} from 'msw';
import database from 'test/mocks/database';
import {DELAY, getLanguage} from 'test/utils';
import {THINGS_URL} from '~/services/api/things/urls';

export default http.delete(
  `${process.env.API_URL}${THINGS_URL}/:id`,
  async ({params, request}) => {
    if (!params.id) {
      return new Response(
        JSON.stringify({
          error: 'Thing ID is required',
        }),
        {status: 400}
      );
    }

    const deletedThing = database[getLanguage(request)].things.delete({
      where: {
        id: {
          equals: String(params.id),
        },
      },
    });

    if (!deletedThing) {
      return new Response(
        JSON.stringify({
          error: `Thing with id "${params.id}" not found`,
        }),
        {status: 404}
      );
    }

    await delay(DELAY);

    return new Response(null, {status: 204});
  }
);
