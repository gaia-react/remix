import {delay, http} from 'msw';
import database from 'test/mocks/database';
import {DELAY} from 'test/utils';
import {GAIA_URLS} from '~/services/gaia/urls';

export default http.delete(
  `${process.env.API_URL}${GAIA_URLS.thingsId}`,
  async ({params}) => {
    if (!params.id) {
      return new Response(
        JSON.stringify({
          error: 'Thing ID is required',
        }),
        {status: 400}
      );
    }

    const deletedThing = database.things.delete({
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
