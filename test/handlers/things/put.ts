import {delay, http} from 'msw';
import database from 'test/mocks/database';
import date, {DELAY, getLanguage} from 'test/utils';
import {THINGS_URL} from '~/services/api/things/urls';
import {tryCatch} from '~/utils/function';

export default http.put(
  `${process.env.API_URL}${THINGS_URL}/:id`,
  async ({params, request}) => {
    const [thing, error] = await tryCatch(async () => {
      const data = await request.formData();

      return Object.fromEntries(data.entries());
    });

    if (error) {
      return new Response(JSON.stringify({error}), {status: 400});
    }

    const data = database[getLanguage(request)].things.update({
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
