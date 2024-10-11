import {delay, http} from 'msw';
import database from 'test/mocks/database';
import {date, DELAY} from 'test/utils';
import {GAIA_ENDPOINTS} from '~/services/gaia/endpoints';
import {tryCatch} from '~/utils/function';

export default http.put(
  `${process.env.API_URL}${GAIA_ENDPOINTS.thingsId}`,
  async ({params, request}) => {
    const [error, thing] = await tryCatch(async () => {
      const data = await request.formData();

      return Object.fromEntries(data.entries());
    });

    if (error) {
      return new Response(JSON.stringify({error}), {status: 400});
    }

    const data = database.things.update({
      data: {
        ...thing,
        updated_at: date({minutes: 30}).toISOString(),
      },
      strict: true,
      where: {
        id: {
          equals: String(params.id),
        },
      },
    });

    await delay(DELAY);

    return new Response(JSON.stringify({data}), {status: 200});
  }
);
