import {delay, http} from 'msw';
import {nanoid} from 'nanoid';
import database from 'test/mocks/database';
import date, {DELAY, getLanguage} from 'test/utils';
import {THINGS_URL} from '~/services/api/things/urls';
import {tryCatch} from '~/utils/function';

export default http.post(
  `${process.env.API_URL}${THINGS_URL}`,
  async ({request}) => {
    const [thing, error] = await tryCatch(async () => {
      const data = await request.formData();

      return Object.fromEntries(data.entries());
    });

    if (error) {
      return new Response(JSON.stringify({error}), {status: 400});
    }

    const data = database[getLanguage(request)].things.create({
      ...thing,
      created_at: date({minutes: 15}).toISOString(),
      id: nanoid(),
      updated_at: null,
    });

    await delay(DELAY);

    return new Response(JSON.stringify({data}), {status: 201});
  }
);
